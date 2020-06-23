import fetch from 'isomorphic-fetch';
import Router from 'next/router';
import Layout from '../components/Layout';
import Users from '../components/Users';
import { API_BASE_URL } from '../config';
import AlertConfirm from '../components/AlertConfirm';
import { useState } from 'react';
import { methodRequet } from '../utils';
import ProgressAnimation from '../components/ProgressAnimation';


const Index = (props) => {
    const [showProgress, setShowProgress] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [credCardId,setCredCardId] = useState('');
    const [userId,setUserId] = useState('');

    const deleteUser = async (id,id_credit_card) =>{
        handleClose();
        setShowProgress(true);
        let idUser = `/${id}`;
        let idCreditCard = `/${id_credit_card}`;

        let delCrediCard= await methodRequet({},'creditCard','DELETE',idCreditCard);
        if(delCrediCard){
            let delUser= await methodRequet({},'users','DELETE',idUser);
            if(delUser){
                Router.push('/');
            }
        }
        setShowProgress(false);
    }
    const confirmDelete = async (id,id_credit_card)=> {
        setCredCardId(id_credit_card);
        setUserId(id);
        setShow(true);
    }
    return (
        <Layout>
            <div className="d-flex w-100 d-flex justify-content-start">
                <h1 className="mr-2">Users</h1>
                <span className="mt-2">
                    <button onClick={e =>Router.push('/sign_up')} type="button" className="btn btn-outline-success">
                    <i className="fa fa-user-plus" aria-hidden="true"></i>
                    </button>
                </span>
            </div>
            <ProgressAnimation show={showProgress}/>
            <Users users={props.users} confirmDelete={confirmDelete}/>
            <AlertConfirm title="Confirm Delete!" body="Are you sure to delete the record?" methodClose={handleClose} userId={userId} credCardId={credCardId} methodModal={deleteUser} title_button="Delete" show={show} />
        </Layout>
    )
}
Index.getInitialProps = async (ctx) => {
   const response =  await fetch(`${API_BASE_URL}/users`);
   const dataResp = await response.json();
   return {users:dataResp.data}
}
export default Index;