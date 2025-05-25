import React, { useState } from 'react';
import { getDB } from '../lib/db';
import '../index.css';

export function PatientForm() {
  const [formData, setFormData] = useState({
    name: '',
    dob: '',
    gender: '',
    address: '',
    phone: '',
    purpose: '',
    remarks: '',
  });

  const [message, setMessage] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // console.log(formData.name.replace(/'/g, "''"))
    try {
      const db = await getDB();

      await db.exec(`
        INSERT INTO patients (name, dob, gender, address, phone, purpose, remarks)
        VALUES (
          '${formData.name}',
          '${formData.dob}',
          '${formData.gender}',
          '${formData.address}',
          '${formData.phone}',  
          '${formData.purpose}',
          '${formData.remarks}'
        );
      `);
      setMessage('✅ Patient registered successfully!');
      setFormData({
        name: '',
        dob: '',
        gender: '',
        address: '',
        phone: '',
        purpose: '',
        remarks: '',
      });
    } catch (err) {
      console.error(err);
      setMessage('❌ Failed to register patient.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ width: '100vw' }}
      className="p-9 bg-white"
    >
      <h2 className="text-2xl font-bold mt-6 mb-6 text-center">Patient Registration</h2>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6 shadow-md rounded-md p-10"
        style={{ width: '80%', margin: '0 auto' }}
      >
        {/* Left Column */}
        <div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Date of Birth</label>
            <input
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            >
              <option value="">Select gender</option>
              <option value="Female">Female</option>
              <option value="Male">Male</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-medium">Purpose of Visit</label>
            <input
              type="text"
              name="purpose"
              value={formData.purpose}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
              required
            />
          </div>
        </div>

        {/* Remarks */}
        <div className="md:col-span-2">
          <label className="block mb-1 -mt-5 font-medium">Remarks</label>
          <textarea
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            rows={3}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
      </div>

      <div className="text-center mt-6">
        <button
          type="submit"
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Register Patient
        </button>

        {message && (
          <p className="mt-4 text-sm text-green-700">{message}</p>
        )}
      </div>
    </form>
  );
}

export default PatientForm;
