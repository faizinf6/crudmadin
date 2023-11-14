import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Table, Modal } from "react-bootstrap";
import DataTable from "./DataTable";

const RekapNilai = () => {
  const [mapelData, setMapelData] = useState([]);
  const [dataMuridDanNilainya, setdataMuridDanNilainya] = useState([]);
  const [selectedNilaiMapel, setselectedNilaiMapel] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [selectedMapel, setSelectedMapel] = useState({});
  const dataKelas = [
    { name: "Pilih Kelas....", value: 1000 },
    { name: "4 Ibt Pa Pagi", value: 1000, gender: "L" },
    { name: "5 Ibt Pa Pagi", value: 2000, gender: "L" },
    { name: "6 Ibt Pa Pagi", value: 3000, gender: "L" },
    { name: "1 Tsn Pa Pagi", value: 4000, gender: "L" },
    { name: "2 Tsn Pa Pagi", value: 5000, gender: "L" },
    { name: "3 Tsn Pa Pagi", value: 6000, gender: "L" },
    { name: "1 Aly Pa Pagi", value: 7000, gender: "L" },
    { name: "2 Aly Pagi", value: 8000, gender: "L" },

    { name: "4 Ibt Pi Pagi", value: 1500, gender: "P" },
    { name: "5 Ibt Pi Pagi", value: 2500, gender: "P" },
    { name: "6 Ibt Pi Pagi", value: 3500, gender: "P" },
    { name: "1 Tsn Pi Pagi", value: 4500, gender: "P" },
    { name: "2 Tsn Pi Pagi", value: 5500, gender: "P" },
    { name: "3 Tsn Pi Pagi", value: 6500, gender: "P" },
    { name: "1 Aly Pi Pagi", value: 7500, gender: "P" },

    { name: "4 Ibt A Pa Siang", value: 1101, gender: "L" },
    { name: "4 Ibt B Pa Siang", value: 1102, gender: "L" },
    { name: "5 Ibt A Pa Siang", value: 2101, gender: "L" },
    { name: "5 Ibt B Pa Siang", value: 2102, gender: "L" },
    { name: "6 Ibt A Pa Siang", value: 3101, gender: "L" },
    { name: "6 Ibt B Pa Siang", value: 3102, gender: "L" },
    { name: "1 Tsn Pa Siang", value: 4100, gender: "L" },
    { name: "2 Tsn Pa Siang", value: 5100, gender: "L" },
    { name: "3 Tsn Pa Siang", value: 6100, gender: "L" },

    { name: "4 Ibt A Pi Siang", value: 1601, gender: "P" },
    { name: "4 Ibt B Pi Siang", value: 1602, gender: "P" },
    { name: "5 Ibt A Pi Siang", value: 2601, gender: "P" },
    { name: "5 Ibt B Pi Siang", value: 2602, gender: "P" },
    { name: "6 Ibt A Pi Siang", value: 3601, gender: "P" },
    { name: "6 Ibt B Pi Siang", value: 3602, gender: "P" },
    { name: "1 Tsn Pi Siang", value: 4600, gender: "P" },
    { name: "2 Tsn Pi Siang", value: 5600, gender: "P" },
    { name: "3 Tsn Pi Siang", value: 6600, gender: "P" },
  ];



  const filteredData = dataMuridDanNilainya.filter(item => item.id_mapel === selectedMapel.id_mapel);


  const [editedNilai, setEditedNilai] = useState(dataMuridDanNilainya.reduce((acc, item) => {
    if (item.id_mapel === selectedMapel.id_mapel) {
      acc[item.id_murid] = item.nilai !== undefined ? item.nilai : 0;
    }
    // console.log(acc);
    return acc;
  }, {}));


  
  const handleEditClick = (mapel) => {
    setSelectedMapel(mapel);
    // masuk (mapel.nama_mapel);

    try {
      // const kelasValue = dataKelas.find(
      //   (student) => student.name === selectedKelas
      // )?.value;

      // const responseDataMurid = await axios.get(
      //   `http://localhost:5000/nilai/rekap?id_kelas=${kelasValue}&id_mapel=${selectedMapel.id_mapel}`
      // );

      // // Set the response text to state
      // // setResponseText(JSON.stringify(response.data, null, 2));
      // setdataMuridDanNilainya(responseDataMurid.data);
    } catch (error) {
      // Set error message to state
      console.log("There was an error: " + error.message);
    }

    setShowModal(true);
  };

  const fetchData = async () => {
    if (selectedMapel.id_mapel) {
      try {
        const kelasValue = dataKelas.find(
          (kelas) => kelas.name === selectedKelas
        )?.value;

        const responseDataMurid = await axios.get(
          `http://localhost:5000/nilai/rekap?id_kelas=${kelasValue}&id_mapel=${selectedMapel.id_mapel}`
        );
        setdataMuridDanNilainya(responseDataMurid.data);
        // console.log(responseDataMurid.data);
        // console.log(selectedMapel.id_mapel);

      } catch (error) {
        console.log("There was an error: " + error.message);
      }
    }
  };

  useEffect(() => {

    fetchData();
    // console.log(dataMuridDanNilainya)
   

   
  }, [selectedMapel]);


  const handleSave = async () => {
    // Kirim perubahan ke server
    fetchData();
    setShowModal(false)


  };

  const filteredStudents = dataKelas.filter(
    (genderKelas) => genderKelas.gender === selectedGender
  );

  const columnProps = {
    sm: 12,
    md: 6,
    lg: 3,
    xl: 3,
  };
  const handleSubmit = async () => {
    try {
      const kelasValue = dataKelas.find(
        (namaKelas) => namaKelas.name === selectedKelas
      )?.value;

      const response = await axios.get(
        `http://localhost:5000/kelas/mapel/all/${kelasValue}`
      );
      // Set the response text to state
      // setResponseText(JSON.stringify(response.data, null, 2));
      setMapelData(response.data);

    } catch (error) {
      // Set error message to state
      console.log("There was an error: " + error.message);
    }
  };

  return (
    <div>
      <Form className="m-1">
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
              <Form.Control
                as="select"
                value={selectedKelas}
                onChange={(e) => setSelectedKelas(e.target.value)}
              >
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
              Proses
            </Button>
          </Col>
        </Row>
      </Form>
      {/* Display the response text */}
      <div className="mt-3">
        {/* <strong>Response:</strong>
          <pre>{responseText}</pre> */}

        <Row className="p-2">
          <Col md={{ span: 5, offset: 5 }}>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Id Mapel</th>
                  <th>Nama Pelajaran</th>
                  <th>Tingkatan</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {mapelData.map((mapel) => (
                  <tr key={mapel.id_mapel}>
                    <td>{mapel.id_mapel}</td>
                    <td>{mapel.nama_mapel}</td>
                    <td>{mapel.Angkatan.nama_angkatan}</td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleEditClick(mapel)}
                      >
                        Edit
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>

        <Modal show={showModal} onHide={() => setShowModal(false)} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title>
              Nilai {selectedMapel.nama_mapel} id Mapel:{" "}
              {selectedMapel.id_mapel}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>


          <DataTable data={dataMuridDanNilainya} />


          
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleSave}>
              Tutup & Refresh
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default RekapNilai;
