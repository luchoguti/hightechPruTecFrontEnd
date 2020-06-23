import FormRegister from '../components/FormRegister';
import dataInit from '../data/information.json';
import { reStartDataInit } from '../utils';

const SignUp = () => {
    let dataInitreStart = reStartDataInit(dataInit);
    return (<FormRegister dataInitForm={dataInitreStart}/>);
}

export default SignUp;