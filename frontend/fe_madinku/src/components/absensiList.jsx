import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col,Table } from 'react-bootstrap';
const AbsensiList=()=>{
    const [dropdown1, setDropdown1] = useState('pg');
    const [dropdown2, setDropdown2] = useState('pa');
    const [dropdown3, setDropdown3] = useState('4 ibt');
    const [dropdown4, setDropdown4] = useState('-');
    const [responseText, setResponseText] = useState('');
    const [muridData, setMuridData] = useState([]);

    const columnProps = {
        sm: 12,
        md: 6,
        lg: 3,
        xl: 3
      };
  const handleSubmit = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/murid/get`, {
        params: {
          waktu_kelas: dropdown1,
          jenis_kelas: dropdown2,
          jenjang_kelas: dropdown3,
          pembagian_kelas: dropdown4
        }
      });
      // Set the response text to state
      setResponseText(JSON.stringify(response.data, null, 2));
      setMuridData(response.data)
    } catch (error) {
      // Set error message to state
      setResponseText('There was an error: ' + error.message);
    }
  };

    return(
        <div>
        <Form className="m-1" >
          <Row>
          <Col {...columnProps}>
              <Form.Group>
                <Form.Label>Waktu Kelas</Form.Label>
                <Form.Control as="select" value={dropdown1} onChange={e => setDropdown1(e.target.value)}>
                  <option value="pg">pg</option>
                  <option value="sg">sg</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col {...columnProps}>
              <Form.Group>
                <Form.Label>Jenis Kelas</Form.Label>
                <Form.Control as="select" value={dropdown2} onChange={e => setDropdown2(e.target.value)}>
                  <option value="pa">pa</option>
                  <option value="pi">pi</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col {...columnProps}>
              <Form.Group>
                <Form.Label>Jenjang Kelas</Form.Label>
                <Form.Control as="select" value={dropdown3} onChange={e => setDropdown3(e.target.value)}>
                  <option value="4 ibt">4 ibt</option>
                  <option value="5 ibt">5 ibt</option>
                  <option value="6 ibt">6 ibt</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col {...columnProps}>
              <Form.Group>
                <Form.Label>Pembagian Kelas</Form.Label>
                <Form.Control as="select" value={dropdown4} onChange={e => setDropdown4(e.target.value)}>
                  <option value="-">-</option>
                  <option value="A">A</option>
                  <option value="B">B</option>
                </Form.Control>
              </Form.Group>
            </Col>
            <Col {...columnProps}>
              <Button variant="primary" onClick={handleSubmit} className="mt-4">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
        {/* Display the response text */}
        <div className="mt-3">
          {/* <strong>Response:</strong>
          <pre>{responseText}</pre> */}
          <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nama</th>
            <th>Gender</th>
            <th>Is Boyong</th>
            <th>Kelas</th>
          </tr>
        </thead>
        <tbody>
          {muridData.map(murid => (
            <tr key={murid.id}>
              <td>{murid.id}</td>
              <td>{murid.Nama}</td>
              <td>{murid.gender}</td>
              <td>{murid.isBoyong ? 'Ya' : 'Tidak'}</td>
              <td>{`${murid.kelas.waktu_kelas} ${murid.kelas.jenis_kelas} ${murid.kelas.jenjang_kelas} ${murid.kelas.pembagian_kelas}`}</td>
            </tr>
          ))}
        </tbody>
      </Table>
        </div>
      </div>
    )




};
export default AbsensiList;