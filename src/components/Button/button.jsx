import cn from 'classnames';
import s from './index.module.css';

function Button({type, children}) {
    
    return (
    <button className={ cn(s.button, {
        [s.primary]: type === 'primary',
        [s.secondary]: type === 'secondary',
    })}>
        {children}
    </button>
    )
}

export default Button;