import s from "./index.module.css";
import cn from "classnames";

function Header({ children, user, onUpdateUser }) {

    const handleClickButtonEdit = (e) => {
        e.preventDefault();
        onUpdateUser({name: 'Максим', about: 'Ментор'})
    }

    return (
        <header className={cn(s.header, "cover")}>
            <div className="container">
                <span> {user?.email}</span> 
                <span> {user?.name}</span>
                <button className="btn" onClick={handleClickButtonEdit}>Изменить</button>
                <div className={s.wrapper}>{children}</div>
            </div>
        </header>
    );
}

export default Header;
