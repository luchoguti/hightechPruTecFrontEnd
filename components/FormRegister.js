import { useState } from 'react';
import { Card, Form } from 'react-bootstrap';

import Layout from '../components/Layout'
import InputField from '../components/InputField';
import InputSelect from '../components/InputSelect'
import CardIconsList from '../components/CardIconsList';
import ProgressAnimation from '../components/ProgressAnimation';
import { valideNumbersOnly, getCardType, methodRequet } from '../utils';
import Router from 'next/router'

const FormRegister = (props)=>{
    const [dataUser, setContact] = useState(
        props.dataInitForm
    );
    const [showProgress, setShowProgress] = useState(false);

    // Input field onChange handler
    const tagOnChange = ( e ) => {
        const { data, errors } = { ...dataUser };
        const currentState = data;
        const { name, value } = e.target;
        currentState[name]["value"] = value;
        setContact({ data:currentState , errors: errors });
    }
    // Input card expiry onKeyUp handler
    const validateCardExpiry = ( e ) => {
        let expiryDate = e.target.value;
        const { data, errors } = { ...dataUser };
        const currentState = data;
        if (e.keyCode !== 8) {
            if (expiryDate > 1 && expiryDate.length === 1) {
                expiryDate = '0' + expiryDate + '/';
            } else if (expiryDate.length === 2) {
                expiryDate = expiryDate + '/';
            }
            currentState["expiry_card"]["value"] = expiryDate;
            setContact({ data:currentState , errors: errors });
        } else {
            currentState["expiry_card"]["value"] = '';
            setContact({ data:currentState , errors: errors });
        }
    }
    // Input fields validation handler
    const formValidation = (dataFormValidate) => {
        let formIsValid = true;
        const { data, errors } = dataFormValidate;
        const currentState = Object.values(data);
        for (let index = 0; index < currentState.length; index++) {
            if(currentState[index]['validate']){
                if (currentState[index]['value'] == "") {
                    formIsValid = false;
                    errors[currentState[index]['var']] = currentState[index]['label']+' is required';
                } else {
                    errors[currentState[index]['var']] = '';
                }
            }
        }
        setContact({ data:data , errors: errors });
        return formIsValid;
    }
    //Validate Form Password 
    const validateConfirmPassword = ( e ) =>{
        const { data, errors } = { ...dataUser };
        let passwordConfirm = e.target.value;
        if(data['password']['value'] !== passwordConfirm){
            errors["password_confirm"] = "Password and Password Confirm must be equal.";
            errors["password"] = "Password and Password Confirm must be equal.";
        }else{
            errors["password_confirm"] = "";
            errors["password"] = "";
        }
        setContact({ data:data , errors: errors });
    }
    const createNewObjectSave = (data) =>{
        const userData = Object.values(data);
        let newDataUser = [];
        let newDataCrediCard = [];
        let newDataTwo = {};
        let newDataThree = {};
        for (let index = 0; index < userData.length; index++) {
            if(userData[index]['type']!='dataHidden'){
                if(userData[index]['type']=='creditCard'){
                    newDataTwo[userData[index]['var']] =  userData[index]['value'];
                    newDataCrediCard['creditCard'] =  newDataTwo;
                }else{
                    newDataThree[userData[index]['var']] =  userData[index]['value'];
                    newDataUser['user'] =  newDataThree;
                }
            }
        }
        let newData = [];
        newData[0] = newDataTwo;
        newData[1] = newDataThree;
        return newData;
    }
   
    // Form onSubmit handler
    const registerUserSubmit = async ( e ) => {
        e.preventDefault();
        if (formValidation(dataUser)) {
            setShowProgress(true);
            const { data } = { ...dataUser };
            let dataSave = createNewObjectSave(data);
            let methodRequetName = '';
            let idUser = '';
            let idCreditCard = '';
            if(dataUser.data.id.value == ""){
                methodRequetName = 'POST';
            }else{
                idUser = `/${dataUser.data.id.value}`;
                idCreditCard = `/${dataUser.data.id_credit_card.value}`;
                methodRequetName = 'PUT';
            }
            let dataRespCreditCard = await methodRequet(dataSave[0],'creditCard',methodRequetName,idCreditCard);
            if(dataRespCreditCard){
                console.log(dataRespCreditCard.uuid);
                let uuidCreditCard = {};
                uuidCreditCard['id_credit_card'] = dataRespCreditCard.uuid;
                let userData = [].concat(uuidCreditCard, dataSave[1]);
                let dataRespUser = await methodRequet(userData,'users',methodRequetName,idUser);
                if(dataRespUser){
                    Router.push('/');
                }
            }
            setShowProgress(false);
            setContact({ data:data , errors: {} });
        }
    }
    const typeIdent = ['Identification Card', 'Passport','NIT'];
    const data = dataUser.data;

    return (
        <Layout>
            <Form onSubmit={registerUserSubmit}>
                <Card className="pt-3">
                    <Card.Header className="white-text text-start absolute-center  py-4">
                        <strong>1. Basic Information</strong>
                    </Card.Header>
                    <Card.Body className="px-lg-5 pt-1">
                        <Form.Row>
                            <InputField
                                unique="basicInfoName"
                                label={data.names.label}
                                name={data.names.var}
                                onChange={tagOnChange}
                                typetag ="text"
                                value={data.names.value}
                                error={dataUser.errors.name}
                            />
                            <InputField
                                unique="basicInfoLastName"
                                label={data.last_names.label}
                                name={data.last_names.var}
                                typetag ="text"
                                value={data.last_names.value}
                                onChange={tagOnChange}
                                error={dataUser.errors.last_names}
                            />
                        </Form.Row>
                        <Form.Row>
                            <InputSelect 
                                unique="basicInfoTypeIdent"
                                label={data.type_identification_id.label}
                                name={data.type_identification_id.var}
                                value={data.type_identification_id.value}
                                optionvalue={typeIdent}
                                onChange={tagOnChange}
                                error={dataUser.errors.type_identification_id}
                            />
                            <InputField
                                unique="basicInfoNumberIdent"
                                label={data.number_identification.label}
                                name={data.number_identification.var}
                                typetag ="number"
                                maxLength="10"
                                value={data.number_identification.value}
                                onChange={tagOnChange}
                                error={dataUser.errors.number_identification}
                            />
                        </Form.Row>
                        <Form.Row>
                            <InputField
                                unique="basicInfoEmail"
                                label={data.email.label}
                                name={data.email.var}
                                typetag ="email"
                                value={data.email.value}
                                onChange={tagOnChange}
                                error={dataUser.errors.email}
                            />
                        </Form.Row>
                            {(()=>{
                                if(dataUser.data.id.value == ""){
                                    return <Form.Row>
                                    <InputField
                                        unique="basicInfoPassword"
                                        label={data.password.label}
                                        name={data.password.var}
                                        typetag ="password"
                                        value={data.password.value}
                                        onChange={tagOnChange}
                                        onKeyUp={validateConfirmPassword}
                                        error={dataUser.errors.password}
                                    />
                                    <InputField
                                        unique="basicInfoPasswordConfirm"
                                        label={data.password_confirm.label}
                                        name={data.password_confirm.var}
                                        typetag ="password"
                                        value={data.password_confirm.value}
                                        onChange={tagOnChange}
                                        onKeyUp={validateConfirmPassword}
                                        error={dataUser.errors.password_confirm}
                                    />
                                    </Form.Row>
                                }
                        })()}
                       
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header className="white-text text-start absolute-center  py-4">
                        <strong>2. Credit Card Payment</strong>
                    </Card.Header>
                    <Card.Body className="px-lg-5 pt-1">
                        <CardIconsList type={getCardType(data.number_card.value)} />
                        <Form.Row>
                            <InputField
                                unique="cardholderName"
                                label={data.name_card.label}
                                name={data.name_card.var}
                                value={data.name_card.value}
                                onChange={tagOnChange}
                                error={dataUser.errors.name_card}
                            />
                            <InputField
                                unique="cardNumber"
                                label={data.number_card.label}
                                maxLength="16"
                                name={data.number_card.var}
                                value={data.number_card.value}
                                onKeyDown={valideNumbersOnly}
                                onChange={tagOnChange}
                                error={dataUser.errors.number_card}
                            />
                        </Form.Row>
                        <Form.Row>
                            <InputField
                                unique="cardExpiry"
                                label={data.expiry_card.label}
                                maxLength="5"
                                name={data.expiry_card.var}
                                value={data.expiry_card.value}
                                onKeyDown={valideNumbersOnly}
                                onKeyUp={validateCardExpiry}
                                onChange={tagOnChange}
                                error={dataUser.errors.expiry_card}
                            />
                            <InputField
                                unique="cardCvv"
                                label={data.security_card.label}
                                maxLength="4"
                                name={data.security_card.var}
                                value={data.security_card.value}
                                onKeyDown={valideNumbersOnly}
                                onChange={tagOnChange}
                                error={dataUser.errors.security_card}
                            />
                        </Form.Row>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Body>
                        {(()=>{
                            if(dataUser.data.id.value == ""){ 
                                return <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Register</button>
                            }else{
                                return <button className="btn btn-outline-info btn-rounded btn-block my-4 waves-effect z-depth-0" type="submit">Update Data</button>
                            }
                        })()}
                            
                    </Card.Body>
                </Card>
            </Form>
            <ProgressAnimation show={showProgress}/>
        </Layout>
    );

}

export default FormRegister;