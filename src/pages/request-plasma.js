import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Alert, Button, Form, InputGroup } from 'react-bootstrap';

const requiredMsg = 'Harus diisi';
const INITIAL_VALUES = {
  name: '',
  age: '',
  phone: '',
  blood: '',
  hospital_address: '',
  min_weight: false,
  sex: ''
};

const schema = yup.object().shape({
  name: yup.string().required(requiredMsg),
  age: yup
    .number()
    .min(18, 'Usia minimal 18 tahun')
    .max(60, 'Usia maksimal 60 tahun')
    .required(requiredMsg),
  phone: yup.number().required(requiredMsg),
  blood: yup.string().required(requiredMsg),
  hospital_address: yup.string().required(requiredMsg),
  min_weight: yup.bool(),
  sex: yup.string()
});

const RequestPlasma = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitForm = async (values, { resetForm, setSubmitting }) => {
    const response = await fetch('/api/request-plasma', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(values)
    });
    const data = await response.json();
    setSubmitting(false);

    if (data.status === 201) {
      setShowSuccess(true);
      resetForm();
      scrollTo(0, 0);
    }
  };

  const formik = useFormik({
    validationSchema: schema,
    onSubmit: handleSubmitForm,
    initialValues: INITIAL_VALUES
  });
  return (
    <>
      <Head>
        <title>Request Plasma Konvalesens</title>
        <meta name="description" content="Data Donor Plasma Konvalesens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-4">Request Plasma Konvalesens</h1>
      <Alert show={showSuccess} variant="success">
        <Alert.Heading>Berhasil</Alert.Heading>
        <p>Terima kasih. Data berhasil kami terima.</p>
        <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => setShowSuccess(false)} variant="outline-success">
            Tutup!
          </Button>
        </div>
      </Alert>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Nama Lengkap Penerima Donor</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            isValid={formik.touched.name && !formik.errors.name}
            isInvalid={!!formik.errors.name}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.name}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Umur / Usia Penerima Donor</Form.Label>
          <InputGroup>
            <Form.Control
              type="number"
              name="age"
              value={formik.values.age}
              onChange={formik.handleChange}
              isValid={formik.touched.age && !formik.errors.age}
              isInvalid={!!formik.errors.age}
            />
            <InputGroup.Text>Tahun</InputGroup.Text>
            <Form.Control.Feedback type="invalid">{formik.errors.age}</Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Golongan Darah Penerima Donor</Form.Label>
          <div>
            <Form.Check
              onChange={formik.handleChange}
              id="blood-a"
              type="radio"
              name="blood"
              label="A"
              value="A"
              isInvalid={!!formik.errors.blood}
              checked={formik.values.blood === 'A'}
            />
            <Form.Check
              onChange={formik.handleChange}
              id="blood-b"
              type="radio"
              name="blood"
              label="B"
              value="B"
              isInvalid={!!formik.errors.blood}
              checked={formik.values.blood === 'B'}
            />
            <Form.Check
              onChange={formik.handleChange}
              id="blood-ab"
              type="radio"
              name="blood"
              label="AB"
              value="AB"
              isInvalid={!!formik.errors.blood}
              checked={formik.values.blood === 'AB'}
            />
            <Form.Check
              onChange={formik.handleChange}
              id="blood-o"
              type="radio"
              name="blood"
              label="O"
              value="O"
              isInvalid={!!formik.errors.blood}
              checked={formik.values.blood === 'O'}
            />

            {!!formik.errors.blood ? (
              <span style={{ color: '#dc3545' }}>{formik.errors.blood}</span>
            ) : null}
          </div>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Berat Badan Penerima Donor</Form.Label>
          <Form.Check
            type="checkbox"
            name="min_weight"
            label="Mempunyai Berat Badan Minimal 55 Kg"
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.min_weight}
            feedback={formik.errors.min_weight}
            id="min_weight_id"
            checked={formik.values.min_weight}
          />
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Jenis Kelamin Penerima Donor</Form.Label>
          <Form.Control
            name="sex"
            onChange={formik.handleChange}
            as="select"
            aria-label="Jenis Kelamin">
            <option value="">Pilih salah satu</option>
            <option value="M" selected={formik.values.sex === 'M'}>
              Laki-Laki
            </option>
            <option value="F" selected={formik.values.sex === 'F'}>
              Perempuan
            </option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formik.errors.sex}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Rumah Sakit tempat Penerima Donor dirawat? (sertakan alamat)</Form.Label>
          <Form.Control
            as="textarea"
            placeholder="Nama dan alamat Rumah Sakit tempat Penerima Donor dirawat"
            type="text"
            name="hospital_address"
            value={formik.values.hospital_address}
            onChange={formik.handleChange}
            isValid={formik.touched.hospital_address && !formik.errors.hospital_address}
            isInvalid={!!formik.errors.hospital_address}
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.hospital_address}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Nomor / Whatsapp yang bisa dihubungi (Contact Person/ Narahubung)</Form.Label>
          <Form.Control
            type="number"
            name="phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            isValid={formik.touched.phone && !formik.errors.phone}
            isInvalid={!!formik.errors.phone}
          />
          <Form.Control.Feedback type="invalid">{formik.errors.phone}</Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </Form>
    </>
  );
};
export default RequestPlasma;
