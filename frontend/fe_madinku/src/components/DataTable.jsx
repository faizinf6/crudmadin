import React, { useState,useEffect  } from 'react';
import axios from 'axios';
import { Table, Button, Form,Toast } from 'react-bootstrap';

const DataTable = ({ data }) => {
    const [values, setValues] = useState(data);
    // console.log(values);
    const [initialValues, setInitialValues] = useState({});
    const [show, setShow] = useState(false);
    useEffect(() => {
        setValues(data);
        const initialVals = data.reduce((acc, curr) => {
            acc[curr.id_murid] = curr.nilai;
            return acc;
        }, {});
        setInitialValues(initialVals);
    }, [data]); // Dependensi useEffect adalah 'data'


    const handleShow = async (id) => {
        const murid = values.find(m => m.id_murid === id);
        try {
            const responseDataMurid = await axios.patch(
                `http://localhost:5000/nilai/update?id=${murid.id_murid}&id_kelas=${murid.id_kelas}&id_mapel=${murid.id_mapel}&nilai=${murid.nilai}`);
                
                // console.log(responseDataMurid);
        } catch (error) {
            
        }
     
        
        console.log(`NIS: ${murid.id_murid}, Nama: ${murid.nama_murid}, Nilai: ${murid.nilai}`);
    };

    const handleChange = (id, newValue) => {
        const newValues = values.map(murid => 
            murid.id_murid === id ? { ...murid, nilai: newValue } : murid
        );
        setValues(newValues);
    };
    const isValueChanged = (id) => {
        return initialValues[id] !== values.find(m => m.id_murid === id).nilai;
    };

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Nama</th>
                    <th>Nilai</th>
                    <th>Tampilkan</th>
                </tr>
            </thead>
            <tbody>
                {values.map(({ id_murid, nama_murid, nilai }) => (
                    <tr key={id_murid}>
                        <td>{nama_murid}</td>
                        <td>
                            <Form.Control
                                type="text"
                                value={nilai}
                                onChange={(e) => handleChange(id_murid, e.target.value)}
                            />
                        </td>
                        <td>
                            <Button variant="primary" onClick={() => handleShow(id_murid)} disabled={!isValueChanged(id_murid)}>
                                Simpan
                            </Button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
};

export default DataTable;
