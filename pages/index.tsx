import Head from 'next/head';
import Calculator from '@/components/Calculator';
import styles from '@/styles/Home.module.css'

export default function Home() {
    return (
        <>
            <Head>
                <title>Calculator</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main className={styles.main}>
                <Calculator />
            </main>
        </>
    )
}
