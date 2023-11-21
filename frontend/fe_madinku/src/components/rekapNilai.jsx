import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Row,
  Col,
  Table,
  Modal,
  Toast,
  ToastContainer,
} from "react-bootstrap";

const RekapNilai = () => {
  const [mapelData, setMapelData] = useState([]);
  const [dataMuridDanNilainya, setdataMuridDanNilainya] = useState([]);
  const [dataMuridDanKehadiran, setdataMuridDanKehadiran] = useState([]);
  const [isiToast, setIsiToast] = useState("");
  const [selectedKelasDropdown, setSelectedKelasDropdown] = useState("");
  const [selectedGender, setSelectedGender] = useState("");

  const [dataMuridContainer, setDataMuridContainer] = useState(dataMuridDanNilainya);
  const [initialValues, setInitialValues] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [showModalEditMapel, setShowModalEditMapel] = useState(false);
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
  const columnProps = {
    sm: 12,
    md: 6,
    lg: 3,
    xl: 3,
  };
  const [showKehadiranModal, setshowKehadiranModal] = useState(false);
  const [kehadiran, setKehadiran] = useState({});
  const [kehadiranAsli, setKehadiranAsli] = useState({});
  const handleShowKehadiranModal = () => setshowKehadiranModal(true);
  const handleCloseKehadiranModal = () => setshowKehadiranModal(false);

  const handleEditKehadiran = (id_murid, field, value) => {
    setKehadiran((prev) => ({
      ...prev,
      [id_murid]: { ...prev[id_murid], [field]: value },
    }));
  };

  const handleSaveDataKehadiran = async (murid) => {
    // console.log(murid.nama_murid, kehadiran[murid.id_murid] || murid.kehadiran);


    const updatedKehadiran = kehadiran[murid.id_murid] || murid.kehadiran;
  
    try {

      const response = await axios.patch(`http://localhost:5000/murid/kehadiran/${murid.id_murid}`, {
        alpha: updatedKehadiran.alpha,
        izin: updatedKehadiran.izin,
        sakit: updatedKehadiran.sakit
      });

      console.log('Response:',  response.data);
      setIsiToast(`${murid.nama_murid} Alpha: ${response.data.alpha}  Sakit: ${response.data.sakit} Izin: ${response.data.izin}`)


    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
    }

    setKehadiranAsli(prev => ({
      ...prev,
      [murid.id_murid]: { ...updatedKehadiran }
    }));
    setShowToast(true)

  };

  const isChanged = (id_murid) => {
    const asli = kehadiranAsli[id_murid];
    const saatIni = kehadiran[id_murid];

    return asli && saatIni && (
      asli.alpha !== saatIni.alpha || asli.izin !== saatIni.izin || asli.sakit !== saatIni.sakit
    );
  };

  const handleEditClick = (mapel) => {
    setSelectedMapel(mapel);
    setShowModalEditMapel(true);
  };

  const fetchDataNilaiMuridPerMapel = async () => {
    if (selectedMapel.id_mapel) {
      try {
        const kelasValue = dataKelas.find(
          (kelas) => kelas.name === selectedKelasDropdown
        )?.value;

        const responseDataMurid = await axios.get(
          `http://localhost:5000/nilai/rekap?id_kelas=${kelasValue}&id_mapel=${selectedMapel.id_mapel}`
        );

        // const responseKehadiranDataMurid = await axios.get(
        //   `http://localhost:5000/murid/kehadiran/perkelas/${kelasValue}`
        // );
        setdataMuridDanNilainya(responseDataMurid.data);
        // setdataMuridDanKehadiran(responseKehadiranDataMurid.data);
        // console.log(responseKehadiranDataMurid);
        // console.log(selectedMapel.id_mapel);
      } catch (error) {
        console.log("There was an error: " + error.message);
      }
    }
  };

  useEffect(() => {
    fetchDataNilaiMuridPerMapel();
    // console.log(dataMuridDanNilainya)
  }, [selectedMapel]);

  useEffect(() => {
    fetchDataKehadiran();
  }, [showKehadiranModal]);

  useEffect(() => {
    const kehadiranAwal = dataMuridDanKehadiran.reduce((acc, murid) => ({
      ...acc,
      [murid.id_murid]: murid.kehadiran
    }), {});
    setKehadiranAsli(kehadiranAwal);
  }, [dataMuridDanKehadiran]);

  const handleEdit = (id_murid, field, value) => {
    setKehadiran(prev => ({
      ...prev,
      [id_murid]: { ...prev[id_murid], [field]: value }
    }));
  };


  const fetchDataKehadiran = async () => {
    try {
      const kelasValue = dataKelas.find(
        (kelas) => kelas.name === selectedKelasDropdown
      )?.value;

      if (kelasValue!==undefined){
      const responseKehadiranDataMurid = await axios.get(
        `http://localhost:5000/murid/kehadiran/perkelas/${kelasValue}`
      );

      setdataMuridDanKehadiran(responseKehadiranDataMurid.data);
      // console.log(responseKehadiranDataMurid);
      // console.log(kelasValue);
    }
    } catch (error) {
      console.log("There was an error: " + error.message);
    }
  }

  const handleSave = async () => {
    // Kirim perubahan ke server
    await fetchDataNilaiMuridPerMapel();
    setShowModalEditMapel(false);
  };

  useEffect(() => {
    setDataMuridContainer(dataMuridDanNilainya);
    const initialVals = dataMuridDanNilainya.reduce((acc, curr) => {
      acc[curr.id_murid] = curr.isi_nilai;
      return acc;
    }, {});
    setInitialValues(initialVals);
  }, [dataMuridDanNilainya]); // Dependensi useEffect adalah 'data'

  const filteredStudents = dataKelas.filter(
    (genderKelas) => genderKelas.gender === selectedGender
  );

  const handleChange = (id, newValue) => {
    const newValues = dataMuridContainer.map((murid) =>
      murid.id_murid === id ? { ...murid, isi_nilai: newValue } : murid
    );
    setDataMuridContainer(newValues);
  };
  const isValueChanged = (id) => {
    return (
      initialValues[id] !== dataMuridContainer.find((m) => m.id_murid === id).isi_nilai
    );
  };

  const handleSimpanDataNilaiMurid = async (id) => {
    const murid = dataMuridContainer.find((m) => m.id_murid === id);
    try {
      const responseDataMurid = await axios.patch(
        `http://localhost:5000/nilai/update?id=${murid.id_murid}&id_kelas=${murid.id_kelas}&id_mapel=${murid.id_mapel}&isi_nilai=${murid.isi_nilai}`
      );

      setIsiToast(
        `Nilai Terbaru: ${responseDataMurid.data.isi_nilai},\n\n\n Nama: ${murid.nama_murid} `
      );

      // console.log(initialValues[id]);
      fetchDataNilaiMuridPerMapel();
    } catch (error) {}

    setShowToast(true);
  };

  
  const handleSubmit = async () => {
    try {
      const kelasValue = dataKelas.find(
        (namaKelas) => namaKelas.name === selectedKelasDropdown
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

  // const handleAbsensiClick = async () => {};

  return (
    <div>
      <ToastContainer className="p-3" position="top-center">
              <Toast
                onClose={() => setShowToast(false)}
                show={showToast}
                delay={3000}
                autohide
                bg="success"
              >
                <Toast.Header>
                  <img
                    className="rounded me-2"
                    alt=""
                  />
                  <strong className="me-auto">Berhasil Disimpan!</strong>
                  {/* <small>11 mins ago</small> */}
                </Toast.Header>
                <Toast.Body> {isiToast} </Toast.Body>
              </Toast>
            </ToastContainer>
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
                value={selectedKelasDropdown}
                onChange={(e) => setSelectedKelasDropdown(e.target.value)}
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
            <Button
              variant="danger"
              onClick={handleShowKehadiranModal}
              className="mx-5 mt-4"
            >
              Lihat Kehadiran
            </Button>
            <Button
              variant="outline-secondary"
              onClick={handleShowKehadiranModal}
              className="mx-5 mt-4"
            >
              Buat Rekap Rapot
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

        <Modal show={showModalEditMapel} onHide={() => setShowModalEditMapel(false)} fullscreen>
          <Modal.Header closeButton>
            <Modal.Title>
              Nilai {selectedMapel.nama_mapel} id Mapel:{" "}
              {selectedMapel.id_mapel}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Nilai</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataMuridContainer.map(({ id_murid, nama_murid, isi_nilai }) => (
                  <tr key={id_murid}>
                    <td>{nama_murid}</td>
                    <td>
                      <Form.Control
                        type="text"
                        value={isi_nilai}
                        onChange={(e) => handleChange(id_murid, e.target.value)}
                      />
                    </td>
                    <td>
                      <Button
                        variant="success"
                        onClick={() => handleSimpanDataNilaiMurid(id_murid)}
                        disabled={!isValueChanged(id_murid)}
                      >
                        Simpan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            
            <Button variant="secondary" onClick={handleSave}>
              Tutup & Refresh
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal
          show={showKehadiranModal}
          onHide={handleCloseKehadiranModal}
          size="lg"
          fullscreen
        >
          <Modal.Header closeButton>
            <Modal.Title>Data Kehadiran</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Nama</th>
                  <th>Alpha</th>
                  <th>Sakit</th>
                  <th>Izin</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {dataMuridDanKehadiran.map((murid) => (
                  <tr key={murid.id_murid}>
                    <td>{murid.nama_murid}</td>
                    <td>
                      <Form.Control
                        type="number"
                        defaultValue={murid.kehadiran.alpha}
                        onChange={(e) =>
                          handleEditKehadiran(
                            murid.id_murid,
                            "alpha",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        defaultValue={murid.kehadiran.sakit}
                        onChange={(e) =>
                          handleEditKehadiran(
                            murid.id_murid,
                            "sakit",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Form.Control
                        type="number"
                        defaultValue={murid.kehadiran.izin}
                        onChange={(e) =>
                          handleEditKehadiran(
                            murid.id_murid,
                            "izin",
                            e.target.value
                          )
                        }
                      />
                    </td>
                    <td>
                      <Button
                        variant="warning"
                        onClick={() => handleSaveDataKehadiran(murid)}
                        disabled={!isChanged(murid.id_murid)}
                      >
                        Simpan
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseKehadiranModal}>
              Tutup
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};
export default RekapNilai;
