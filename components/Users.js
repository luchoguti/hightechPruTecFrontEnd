import Router from 'next/router';

const Users = (props) =>{
    return (
        <div className="list-group">
            {
                props.users.map(user => (
                    <a key={user.id} className="list-group-item list-group-item-action flex-column align-items-start">
                        <div className="d-flex justify-content-between">
                            <h5>{user.names} {user.last_names}</h5>
                            <div>
                                <button onClick={e => Router.push('/users/[id]',`/users/${user.id}`)} type="button" className="btn btn-outline-info mr-2">
                                    <i className="fa fa-pencil-square-o" aria-hidden="true"></i>
                                </button>
                                <button type="button" className="btn btn-outline-danger" onClick={()=>props.confirmDelete(user.id,user.id_credit_card)}>
                                    <i className="fa fa-user-times" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                        <div className="d-flex w-100 justify-content-around">
                            <p>Email: {user.email}</p>
                            <p className="">Type Ident: {user.type_identification}</p>
                            <p>Number Ident: {user.number_identification}</p>
                        </div>
                    </a>
                ))
            }
        </div>
    )   
}

export default Users;