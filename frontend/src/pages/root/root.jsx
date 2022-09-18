import s from './root.module.css'
import Button from "../../components/button/Button";

export default function Root(props) {
    const heading =  (props.isNew) ? 'Привет, зарегистрированный пользователь' :  'Привет, новый пользователь';
    return (
        <>
            <div className={s.main} id="welcome">
                <h1>{heading}</h1>
                <div className={s.form}>
                    <form id="welcome-form" role="search">
                        <input
                            id="q"
                            aria-label="Login"
                            placeholder="Login"
                            type="email"
                            name="q"
                        />

                        {!props.isNew && (
                            <input
                                id="q"
                                aria-label="Login"
                                placeholder="Your name"
                                type="email"
                                name="q"
                            />
                        )}

                        <input
                            id="q"
                            aria-label="Password"
                            placeholder="Password"
                            type="password"
                            name="q"
                        />
                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={true}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </form>
                    <form method="post">
                        <Button>
                            {!props.isNew && (
                                "Sign in"
                            )}
                            {props.isNew && (
                                "Log in"
                            )}
                        </Button>
                    </form>
                </div>
            </div>
        </>
    );
}
