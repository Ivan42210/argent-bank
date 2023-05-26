import { Link } from "react-router-dom"
import './Error.css'

export default function ErrorPage(){


    return(
        <main className="main bg-dark flex-center">
            <h3 className="error-message">Error 404</h3>
            <Link className="error-link" to={'/'}>Back to the home page</Link>
        </main>
    )
}