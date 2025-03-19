import { ThemedTitleV3 } from "@components/layout/title";


export function Headerlogo({ collapsed }: { collapsed: boolean }) {
    return <>

        <ThemedTitleV3 collapsed={collapsed} icon={<>

            <img src="/logo2.svg" width="40" height="40" />
        </>} text="Euro Decor" ></ThemedTitleV3>
    </>
}