import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function LoginPage(){

    return(
        <>
            <main className="main bg-dark">
                <section className="sign-in-content">
                    <FontAwesomeIcon icon={'user-circle'} className="sing-in-icon"></FontAwesomeIcon>
                    <h1>Sign in</h1>

                </section>

            </main>
        </>
    )
}