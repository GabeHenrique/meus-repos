import {useRouteError} from "react-router-dom";
import "./styles.css"

export default function NotFound() {

    // @ts-ignore
    const {statusText, message} = useRouteError();

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{statusText || message}</i>
            </p>
        </div>
    );
}