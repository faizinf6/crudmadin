import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Button, Row, Col, Table, Modal } from "react-bootstrap";

const RekapNilai = () => {
  const [mapelData, setMapelData] = useState([]);
  const [muridData, setMuridData] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editDataNilai, setEditDataNilai] = useState({});

  const handleEditClick = (mapel) => {
    setEditDataNilai(mapel);
    // masuk (mapel.nama_mapel);

    // console.log(mapel);
    setShowModal(true);
  };

  const handleSave = async () => {
    // Kirim perubahan ke server
    const url = `http://localhost:5000/murid/${editDataNilai.id_murid}`; // Ganti dengan endpoint yang sesuai
    try {
      const response = await axios.patch(url, {
        nama_murid: editDataNilai.nama_murid,
        isBoyong: editDataNilai.isBoyong,
        id_kelas: editDataNilai.id_kelas,
      });
      const updatedData = response.data;
      setMapelData(
        mapelData.map((kelas) => {
          if (kelas.id_kelas === updatedData.id_kelas) {
            return {
              ...kelas,
              Murids: kelas.Murids.map((murid) =>
                murid.id_murid === updatedData.id_murid ? updatedData : murid
              ),
            };
          } else {
            return kelas;
          }
        })
      );
      setShowModal(false); // Tutup modal setelah selesai
    } catch (error) {
      console.error("Error saat mengirim data", error);
    }
  };

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

    // Tambahkan lebih banyak objek sesuai kebutuhan
  ];
  const filteredStudents = dataKelas.filter(
    (student) => student.gender === selectedGender
  );

  const columnProps = {
    sm: 12,
    md: 6,
    lg: 3,
    xl: 3,
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const kelasValue = dataKelas.find(
        (student) => student.name === selectedKelas
      )?.value;

      const response = await axios.get(
        `http://localhost:5000/kelas/mapel/all/${kelasValue}`
      );
      
      const responseDataMurid = await axios.get(
        `http://localhost:5000/kelas/murid/all/${kelasValue}`
      );

      // Set the response text to state
      // setResponseText(JSON.stringify(response.data, null, 2));
      setMapelData(response.data);
      setMuridData(responseDataMurid.data);
      
  
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
            {" "}
            {/* Atur span dan offset sesuai kebutuhan */}
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
            <Modal.Title>Nilai {editDataNilai.nama_mapel} id Mapel: {editDataNilai.id_mapel}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>NIS</th>
                <th>Nama</th>
                <th>Nilai</th>
                <th>Simpan?</th>
              </tr>
            </thead>
            <tbody>
              {muridData.map((kelas) => kelas.Murids.map((murid)=>(
                <tr key={murid.id_murid}>
                  <td>{murid.id_murid}</td>
                  <td>{murid.nama_murid}</td>
                  <td>
                    <Form.Control type="number" />
                  </td>
                  <td>
                      <Button
                        variant="warning"
                        onClick={()=>console.log(editDataNilai)}
                      >
                        Simpan
                      </Button>
                    </td>
                </tr>
              )))}
            </tbody>
          </Table>
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
  );
};
export default RekapNilai;
