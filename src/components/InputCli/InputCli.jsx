import './InputCli.css'

const InputCli = () => {
  return (
    <div className="input-cli--container">
        <form className='input-cli--form'>
            <label for="fname">&gt;</label>
            <input type="text" size="100" name="cli-input"/>
       </form>
    </div>
  )
}
export default InputCli