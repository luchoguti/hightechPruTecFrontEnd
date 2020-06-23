import { Form, Col } from 'react-bootstrap';

import { valideFocus, valideFocusOut } from '../utils';

const InputSelect = ( props ) => {
  const { unique, label, name, value, optionvalue, error, ...rest } = props;

  return (
      <Form.Group as={Col} controlId={unique}>
        <Form.Label>{label} </Form.Label>
        <Form.Control 
          { ...rest }
          name={name}
          onFocus={valideFocus}
          onBlur={valideFocusOut}
          isInvalid={!!error}
          as="select"
          value={value}
        >
          <option value="">Choose...</option>
          {
            optionvalue.map((ittem,index) => (
              <option key={index+1} value={index+1}>{ittem}</option>
            ))
          }
        </Form.Control>
        <Form.Control.Feedback type="invalid">
          {error}
        </Form.Control.Feedback>
      </Form.Group>
  );
}

export default InputSelect;