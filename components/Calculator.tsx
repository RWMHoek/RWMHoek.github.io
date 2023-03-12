import Job from '@/lib/classes/Job'
import Part from '@/lib/classes/Part';
import { getTypedValue, toCurrency } from '@/lib/utils';
import React, { ChangeEvent, MouseEvent, useState } from 'react'
import styles from '@/styles/Calculator.module.css';

function Calculator() {

    const [jobs, setJobs] = useState([new Job("", 0, [])]);

    function addJob() {
        setJobs([
            ...jobs,
            new Job("", 0, [])
        ]);
    }

    // handle changes in job name and labour
    function handleJobChange({target}: ChangeEvent<HTMLInputElement>) {
        // Get the job index
        const i = Number(target.dataset.jobindex);

        // Generate a temporary clone of the job and update the value in this clone
        const temp: Job = jobs[i].clone();
        (temp[target.name as keyof Job] as string | number | boolean) = getTypedValue(target);

        // Set jobs state with temporary clone in place of original job
        setJobs([
            ...jobs.slice(0, i),
            temp,
            ...jobs.slice(i + 1)
        ]);
    }

    function removeJob(i: number): void {
        const temp: Job[] = [...jobs];
        temp.splice(i, 1)
        setJobs(temp);
    }

    // handle adding a part to a job
    function addPart(i: number) {
        const temp: Job = jobs[i].clone();
        temp.addPart();
        setJobs([
            ...jobs.slice(0, i),
            temp,
            ...jobs.slice(i + 1)
        ]);
    }

    // handle changing a part
    function handlePartChange({target}: ChangeEvent<HTMLInputElement>) {
        const i = Number(target.dataset.jobindex);
        const j = Number(target.dataset.partindex);
        const temp: Job = jobs[i].clone();
        (temp.parts[j][target.name as keyof Part] as string | number | boolean ) = getTypedValue(target);
        setJobs([
            ...jobs.slice(0, i),
            temp, 
            ...jobs.slice(i + 1)
        ]);
    }

    // handle deleting a part
    function removePart(i: number, j: number) {
        const temp: Job = jobs[i].clone();
        temp.parts.splice(j, 1);
        setJobs([
            ...jobs.slice(0, i),
            temp,
            ...jobs.slice(i + 1)
        ]);
    }

    return (
        <>
            <form className={styles.form}>
                {jobs.map((job, jobIndex) => {

                    return (
                        <div key={jobIndex} className={styles.job}>
                            <div className={styles.jobHead}>
                                <label htmlFor="name">Job:</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={job.name}
                                    onChange={handleJobChange}
                                    data-type="string"
                                    data-jobindex={jobIndex}
                                />

                                <label htmlFor="labour">Labour (hours):</label>
                                <input
                                    type="number"
                                    name="labour"
                                    id="labour"
                                    value={job.labour}
                                    onChange={handleJobChange}
                                    data-type="number"
                                    data-jobindex={jobIndex}
                                />

                                <input type="button" className={styles.closeButton} value="X" onClick={() => removeJob(jobIndex)} />
                            </div>

                            <div className={styles.jobBody}>
                                <div className="partList">
                                    <ul className={styles.partsList}>
                                        {
                                            job.parts.map((part, partIndex) => {
                                                return (
                                                    <li key={partIndex} className={styles.part}>
                                                        <input
                                                            type="text"
                                                            name="name"
                                                            id={`part${partIndex}name`}
                                                            value={part.name}
                                                            onChange={handlePartChange}
                                                            placeholder="Part"
                                                            data-type="string"
                                                            data-jobindex={jobIndex}
                                                            data-partIndex={partIndex}
                                                        />

                                                        <input
                                                            type="checkbox"
                                                            name="isAftermarket"
                                                            id={`part${partIndex}isAftermarket`}
                                                            checked={part.isAftermarket}
                                                            onChange={handlePartChange}
                                                            data-jobindex={jobIndex}
                                                            data-partIndex={partIndex}
                                                            data-type="boolean"
                                                        />
                                                        <label className={styles.checkboxLabel} htmlFor={`part${partIndex}isAftermarket`}>Aftermarket</label>

                                                        <span style={part.isAftermarket ? {visibility: "visible"} : {visibility: "hidden"}}>
                                                            <label htmlFor={`${partIndex}cost`}>Cost:</label>
                                                            <input
                                                                type="number"
                                                                name="cost"
                                                                id={`${partIndex}cost`}
                                                                value={part.cost}
                                                                onChange={handlePartChange}
                                                                data-partIndex={partIndex}
                                                                data-jobindex={jobIndex}
                                                                data-type="number"
                                                            />

                                                            <input
                                                                type="checkbox"
                                                                name="isCostIn"
                                                                id={`isCostIn${partIndex}`}
                                                                value={Number(part.isCostIn)}
                                                                onChange={handlePartChange}
                                                                data-partIndex={partIndex}
                                                                data-jobindex={jobIndex}
                                                                data-type="boolean"
                                                            />
                                                            <label className={styles.checkboxLabel} htmlFor={`isCostIn${partIndex}`}>Including GST</label>
                                                        </span>

                                                        <label htmlFor={`part${partIndex}retail`}>Retail (in):</label>
                                                        <input
                                                            type="number"
                                                            name='retail'
                                                            id={`part${partIndex}retail`}
                                                            value={part.retail}
                                                            onChange={handlePartChange}
                                                            data-partIndex={partIndex}
                                                            data-jobindex={jobIndex}
                                                            data-type="number"
                                                        />

                                                        <label htmlFor={`part${partIndex}amount`}>Quantity:</label>
                                                        <input
                                                            type="number"
                                                            name='amount'
                                                            id={`part${partIndex}amount`}
                                                            value={part.amount}
                                                            onChange={handlePartChange}
                                                            data-partindex={partIndex}
                                                            data-jobindex={jobIndex}
                                                            data-type="number"
                                                        />

                                                        <input type="button" value="X" onClick={() => removePart(jobIndex, partIndex)} />
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                    <input type="button" value="Add Part" onClick={() => addPart(jobIndex)} />
                                </div>

                                <p>Job total: <span className={styles.jobTotal}>{toCurrency(job.total())}</span></p>
                            </div>

                        </div>
                    )
                })}
                
                <div className={styles.formFooter}>
                    <input type="button" value="Add Job" onClick={addJob} />

                    <p>Total: <span className={styles.jobTotal}>{toCurrency(jobs.reduce((prev, curr) => {return prev + curr.total()}, 0))}</span></p>
                </div>
            </form>
        </>
    )
}

export default Calculator;
