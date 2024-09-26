import './Input.css';

export default function Input(props){
    return (
        <input className={props.className} placeholder={props.placeholder} value={props.text} type="text" onChange={props.onChange}/>
    )
}