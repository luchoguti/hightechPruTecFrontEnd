import fetch from 'isomorphic-fetch';
import { API_BASE_URL  } from '../../config';
import dataInit from '../../data/information.json';
import FormRegister from '../../components/FormRegister'


const User = (props) =>{
    const { data, errors } = dataInit;
    const newData = Object.values(data);
    const dataDbUser = props.user;
    for (let index = 0; index < newData.length; index++) {
        const credit_carts = dataDbUser['foreign_key_credit_carts'][0];
        if(dataDbUser[newData[index]['var']]){
            newData[index]['value'] = dataDbUser[newData[index]['var']];
        }else if(newData[index]['var']=="name_card"){
            newData[index]['value'] = credit_carts['card_holder_name'];
        }else if(newData[index]['var']=="number_card"){
            newData[index]['value'] = credit_carts['card_number'];
        }else if(newData[index]['var']=="expiry_card"){
            let expiration_card = credit_carts['expiration_card'].split('-')
            newData[index]['value'] = expiration_card[1]+'/'+expiration_card[0].slice(-2);
        }else if(newData[index]['var']=="security_card"){
            newData[index]['value'] = credit_carts['cvc'];
        }else if(newData[index]['var']=="password" || newData[index]['var']=="password_confirm"){
            newData[index]['value'] = 'N/A';
        }
    }
    let reOrganizeData = {};
    for (let j = 0; j < newData.length; j++) {
        reOrganizeData[newData[j]['var']] = newData[j];
    }
    let dataInitNew = {};
    dataInitNew['data'] = reOrganizeData;
    dataInitNew['errors'] = errors;
    return (<FormRegister dataInitForm={dataInitNew} />);
}

User.getInitialProps = async (ctx) => {
    const resp= await fetch(`${API_BASE_URL}/users/${ctx.query.id}`);
    const resJson = await resp.json();
    return {user: resJson.data[0]};
}

export default User;