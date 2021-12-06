import s from './HomeView.module.css';

export default function HomeView() {
    return (
        <h1 className={s.title}>
            <b className={s.text}>Welcome!</b> To use the Phone Book <br />
        </h1>
    );
}
