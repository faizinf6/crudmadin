import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form, Button, Row, Col,Table,Modal  } from 'react-bootstrap';
const AbsensiList=()=>{
    const [dropdown1, setDropdown1] = useState('pg');
    const [dropdown2, setDropdown2] = useState('pa');
    const [dropdown3, setDropdown3] = useState('4 ibt');
    const [dropdown4, setDropdown4] = useState('-');
    const [responseText, setResponseText] = useState('');
    const [muridData, setMuridData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState('');
    const [selectedGender, setSelectedGender] = useState('');
    

    const [showModal, setShowModal] = useState(false);
    const [editData, setEditData] = useState({});
  
    const handleEditClick = (murid) => {
      setEditData(murid);
      setShowModal(true);
    };
  
    const handleSave = async () => {
      // Kirim perubahan ke server
      const url = `http://localhost:5000/murid/${editData.id_murid}`; // Ganti dengan endpoint yang sesuai
      try {
        const response = await axios.patch(url, {
          nama_murid: editData.nama_murid,
          isBoyong: editData.isBoyong,
          id_kelas: editData.id_kelas
        });
        const updatedData = response.data;
        setMuridData(muridData.map(kelas => {
          if (kelas.id_kelas === updatedData.id_kelas) {
            return { ...kelas, Murids: kelas.Murids.map(murid => murid.id_murid === updatedData.id_murid ? updatedData : murid) };
          } else {
            return kelas;
          }
        }));
        setShowModal(false); // Tutup modal setelah selesai
      } catch (error) {
        console.error('Error saat mengirim data', error);
      }
    };
  

    const students = [
      { name: "Pilih Kelas....", value: 1000 },
      { name: "4 Ibt Pa Pagi", value: 1000,gender: "L" },
      { name: "5 Ibt Pa Pagi", value: 2000,gender: "L" },
      { name: "5 Ibt Pi Pagi", value: 2000,gender: "P" },
      // Tambahkan lebih banyak objek sesuai kebutuhan
    ];
    const filteredStudents = students.filter(student => student.gender === selectedGender);



    const columnProps = {
        sm: 12,
        md: 6,
        lg: 3,
        xl: 3
      };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const studentValue = students.find(student => student.name === selectedStudent)?.value;
      
      const response = await axios.get(`http://localhost:5000/kelas/murid/all/${studentValue}`);
      // Set the response text to state
      // setResponseText(JSON.stringify(response.data, null, 2));
      setMuridData(response.data)
    } catch (error) {
      // Set error message to state
      console.log('There was an error: ' + error.message);
    }
  };

    return(
        <div>
        <Form className="m-1" >
          <Row>
            <Col {...columnProps}>
              <Form.Group>
              <div key={`inline-radio`} className="mb-3">
          <Form.Check 
            inline
            label="Putra"
            name="gender"
            type="radio"
            id={`inline-radio-1`}
            value="L"
            onChange={(e) => setSelectedGender(e.target.value)}
          />
          <Form.Check 
            inline
            label="Putri"
            name="gender"
            type="radio"
            id={`inline-radio-2`}
            value="P"
            onChange={(e) => setSelectedGender(e.target.value)}
          />
        </div>


                <Form.Label>Pembagian Kelas</Form.Label>
                <Form.Control as="select" value={selectedStudent} onChange={(e) => setSelectedStudent(e.target.value)}>
            <option value="">Pilih...</option>
            {filteredStudents.map((student, index) => (
              <option key={index} value={student.name}>
                {student.name}
              </option>
            ))}
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
            <th>NIS</th>
            <th>Nama</th>
            <th>Is Boyong</th>
            <th>Kelas</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
        {muridData.map((kelas) =>
              kelas.Murids.map((murid) => (
                <tr key={murid.id_murid}>
                  <td>{murid.id_murid}</td>
                  <td>{murid.nama_murid}</td>
                  <td>{murid.isBoyong ? 'Ya' : 'Tidak'}</td>
                  <td>{kelas.nama_kelas}</td>
                  <Button variant="primary" onClick={() => handleEditClick(murid)}>
                    Edit
                  </Button>
                </tr>
              ))
            )}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Murid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nama Murid</Form.Label>
              <Form.Control
                type="text"
                value={editData.nama_murid}
                onChange={(e) => setEditData({ ...editData, nama_murid: e.target.value })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Check 
                type="checkbox" 
                label="Is Boyong" 
                checked={editData.isBoyong}
                onChange={(e) => setEditData({ ...editData, isBoyong: e.target.checked })}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>ID Kelas</Form.Label>
              <Form.Control
                type="text"
                value={editData.id_kelas}
                onChange={(e) => setEditData({ ...editData, id_kelas: e.target.value })}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Batal
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Simpan
          </Button>
        </Modal.Footer>
      </Modal>
        </div>
      </div>
    )




};
export default AbsensiList;