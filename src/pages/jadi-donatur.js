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
  min_weight: false,
  sex: '',
  positive_covid: false,
  recovered_covid: '',
  is_healthy: '',
  is_ready_donor: ''
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
  min_weight: yup.bool(),
  sex: yup.string(),
  positive_covid: yup
    .bool()
    .required()
    .oneOf([true], 'Anda harus pernah menderita COVID-19 untuk bisa melakukan donor.'),
  recovered_covid: yup.string().oneOf(['YES', 'NO', '']),
  is_healthy: yup.string().oneOf(['YES', 'NO', '']),
  is_ready_donor: yup.string().required(requiredMsg).oneOf(['YES', 'NO', ''])
});

const Home = () => {
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubmitForm = async (values, { resetForm, setSubmitting }) => {
    const response = await fetch('/api/donatur', {
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
        <title>Jadi Donatur Plasma Konvalesens</title>
        <meta name="description" content="Data Donor Plasma Konvalesens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1>Jadi Donatur Plasma Konvalesens</h1>
      <p>
        Kepada Calon Pendonor Penyintas COVID-19,
        <br /> dengan menyerahkan data ini berarti Anda sudah siap menjadi Calon Pendonor Plasma
        Konvalesens UDD PMI Kota Yogyakarta, silahkan mengisi formulir dibawah ini ini dengan
        sejujur-jujurnya.
      </p>
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
      <p>Jika anda memenuhi persyaratan di bawah, mohon isi formulir di bawah ini</p>
      <div className="text-center">
        <Image
          src="/assets/IG-PLASMA-31.jpg"
          alt="syarat"
          width={590}
          height={600}
          layout="intrinsic"
        />
      </div>
      <Form noValidate onSubmit={formik.handleSubmit}>
        <Form.Group md="4" className="mb-4">
          <Form.Label>Nama Anda</Form.Label>
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
          <Form.Label>Umur / Usia</Form.Label>
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
          <Form.Label>Nomor / Whatsapp</Form.Label>
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
        <Form.Group md="4" className="mb-4">
          <Form.Label>Golongan Darah</Form.Label>
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
          <Form.Label>Berapakah berat badan anda</Form.Label>
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
          <Form.Label>Jenis Kelamin</Form.Label>
          <Form.Control
            name="sex"
            onChange={formik.handleChange}
            as="select"
            aria-label="Jenis Kelamin">
            <option value="">Pilih salah satu</option>
            <option value="M" selected={formik.values.sex === 'M'}>
              Laki-Laki
            </option>
            <option value="L" selected={formik.values.sex === 'L'}>
              Perempuan belum pernah Hamil dan di transfusi darah
            </option>
          </Form.Control>
          <Form.Control.Feedback type="invalid">{formik.errors.sex}</Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Label>
            Pernah menderita COVID-19 dan dibuktikan dengan Swab PCR/ Antigen dengan hasil Positif ?
          </Form.Label>
          <Form.Check
            required
            type="checkbox"
            name="positive_covid"
            label="Ya, pernah"
            onChange={formik.handleChange}
            isInvalid={!!formik.errors.positive_covid}
            feedback={formik.errors.positive_covid}
            id="positive_covid_id"
            checked={formik.values.positive_covid}
          />
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>
            Sudah dinyatakan sembuh dari COVID-19 (dibuktikan dengan hasil Swab Negatif/ surat
            pernyataan sembuh dari dokter/ RS) dan tidak mengalami gejala selama 14 hari ?
          </Form.Label>
          <div>
            <Form.Check
              onChange={formik.handleChange}
              id="recovered_covid-yes"
              type="radio"
              name="recovered_covid"
              label="Ya"
              value="YES"
              checked={formik.values.recovered_covid === 'YES'}
            />
            <Form.Check
              onChange={formik.handleChange}
              id="recovered_covid-no"
              type="radio"
              name="recovered_covid"
              label="Tidak"
              value="NO"
              checked={formik.values.recovered_covid === 'NO'}
            />
          </div>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>
            Kondisi sehat, cukup istirahat, siap menjadi pendonor plasma konvalesen ?
          </Form.Label>
          <div>
            <Form.Check
              onChange={formik.handleChange}
              id="is_healthy-yes"
              type="radio"
              name="is_healthy"
              label="Ya"
              value="YES"
              checked={formik.values.is_healthy === 'YES'}
            />
            <Form.Check
              onChange={formik.handleChange}
              id="is_healthy-no"
              type="radio"
              name="is_healthy"
              label="Tidak"
              value="NO"
              checked={formik.values.is_healthy === 'NO'}
            />
          </div>
        </Form.Group>
        <Form.Group md="4" className="mb-4">
          <Form.Label>
            Siap mendonorkan plasma darah secara sukarela ke PMI Kota Yogyakarta ?
          </Form.Label>
          <div>
            <Form.Check
              onChange={formik.handleChange}
              id="is_ready_donor-yes"
              type="radio"
              name="is_ready_donor"
              label="Ya"
              value="YES"
              isInvalid={!!formik.errors.is_ready_donor}
              checked={formik.values.is_ready_donor === 'YES'}
            />
            <Form.Check
              onChange={formik.handleChange}
              id="is_ready_donor-no"
              type="radio"
              name="is_ready_donor"
              label="Tidak"
              value="NO"
              isInvalid={!!formik.errors.is_ready_donor}
              checked={formik.values.is_ready_donor === 'NO'}
            />
            {!!formik.errors.blood ? (
              <span style={{ color: '#dc3545' }}>{formik.errors.is_ready_donor}</span>
            ) : null}
          </div>
        </Form.Group>
        <Button type="submit" disabled={formik.isSubmitting}>
          Submit
        </Button>
      </Form>
    </>
  );
};
export default Home;
