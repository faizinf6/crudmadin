import React from 'react';
import { Table } from 'react-bootstrap';

const TabelRapot = ({ jsonData, dataKehadiran }) => {
    // Mengekstrak semua 'fan' yang unik untuk membuat header tabel
    const allFans = new Set();
    jsonData.flat().forEach(item => {
        allFans.add(item.fan);
    });
    const fanHeaders = Array.from(allFans);

    // Mengelompokkan data kehadiran berdasarkan 'id_murid'
    const kehadiranById = dataKehadiran.reduce((acc, item) => {
        acc[item.id_murid] = item.kehadiran.alpha; // asumsikan 'alpha' adalah nilai pelanggaran
        return acc;
    }, {});

    // Mengelompokkan dan menghitung nilai murid, total, pelanggaran, dan grand total
    const groupedData = jsonData.reduce((acc, current) => {
        current.forEach(item => {
            const { id_murid, nama_murid, fan, isi_nilai } = item;
            const adjustedValue = isi_nilai < 5.5 ? 5.5 : isi_nilai;
            if (!acc[id_murid]) {
                acc[id_murid] = { nama_murid, nilai: {}, total: 0, count: 0, pelanggaran: kehadiranById[id_murid] || 0 };
            }
            acc[id_murid].nilai[fan] = adjustedValue;
            acc[id_murid].total += adjustedValue;
            acc[id_murid].count += 1;
        });
        return acc;
    }, {});

    // Menghitung grand total dan rata-rata
    Object.values(groupedData).forEach(murid => {
        murid.grandTotal = murid.total - murid.pelanggaran;
        murid.average = (murid.grandTotal / murid.count).toFixed(1); // Memastikan satu tempat desimal
    });

    // Menghasilkan baris tabel
    const tableRows = Object.values(groupedData).map(murid => (
        <tr key={murid.nama_murid}>
            <td>{murid.nama_murid}</td>
            {fanHeaders.map(fan => {
                const nilai = murid.nilai[fan] || '-';
                const isHighlighted = nilai !== '-' && nilai <= 5.5;
                return (
                    <td key={`${murid.nama_murid}-${fan}`}
                        style={isHighlighted ? { backgroundColor: 'red', color: 'white' } : {}}>
                        {nilai}
                    </td>
                );
            })}
            <td>{murid.total}</td>
            <td>{murid.pelanggaran}</td>
            <td>{murid.grandTotal}</td>
            <td style={parseFloat(murid.average) <= 5.5 ? { backgroundColor: 'red', color: 'white' } : {}}>
                {murid.average}
            </td>
        </tr>
    ));

    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>nama/fan</th>
                {fanHeaders.map(fan => <th key={fan}>{fan}</th>)}
                <th>Total</th>
                <th>Pelanggaran</th>
                <th>Grand Total</th>
                <th>Rata-rata</th>
            </tr>
            </thead>
            <tbody>{tableRows}</tbody>
        </Table>
    );
};

export default TabelRapot;

//TabelRapot

