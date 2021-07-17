import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { Formik } from 'formik';
import * as yup from 'yup';
import { Button, Col, Form, InputGroup } from 'react-bootstrap';

const requiredMsg = 'Harus diisi';

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
  return (
    <>
      <Head>
        <title>Jadi Donatur Plasma Konvalesens</title>
        <meta name="description" content="Data Donor Plasma Konvalesens" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="text-center">
        <h1>Jadi Donatur Plasma Konvalesens</h1>
        <p>Jika anda memenuhi persyaratan di bawah, mohon isi formulir di bawah ini</p>
        <p>
          <Image
            src="/assets/IG-PLASMA-31.jpg"
            alt="syarat"
            width={590}
            height={600}
            layout="intrinsic"
          />
        </p>
      </div>
      <Formik
        validationSchema={schema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          setTimeout(() => {
            console.log(values);
            setSubmitting(false);
            resetForm();
          }, 400);
        }}
        initialValues={{
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
        }}>
        {({ handleSubmit, handleChange, handleBlur, values, touched, isValid, errors }) => {
          return (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group md="4" className="mb-4">
                <Form.Label>Nama Anda</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={values.name}
                  onChange={handleChange}
                  isValid={touched.name && !errors.name}
                  isInvalid={!!errors.name}
                />
                <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>Umur / Usia</Form.Label>
                <InputGroup>
                  <Form.Control
                    type="number"
                    name="age"
                    value={values.age}
                    onChange={handleChange}
                    isValid={touched.age && !errors.age}
                    isInvalid={!!errors.age}
                  />
                  <InputGroup.Text>Tahun</InputGroup.Text>
                  <Form.Control.Feedback type="invalid">{errors.age}</Form.Control.Feedback>
                </InputGroup>
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>Nomor / Whatsapp</Form.Label>
                <Form.Control
                  type="number"
                  name="phone"
                  value={values.phone}
                  onChange={handleChange}
                  isValid={touched.phone && !errors.phone}
                  isInvalid={!!errors.phone}
                />
                <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>Golongan Darah</Form.Label>
                <div>
                  <Form.Check
                    onChange={handleChange}
                    id="blood-a"
                    type="radio"
                    name="blood"
                    label="A"
                    value="A"
                    isInvalid={!!errors.blood}
                    checked={values.blood === 'A'}
                  />
                  <Form.Check
                    onChange={handleChange}
                    id="blood-b"
                    type="radio"
                    name="blood"
                    label="B"
                    value="B"
                    isInvalid={!!errors.blood}
                    checked={values.blood === 'B'}
                  />
                  <Form.Check
                    onChange={handleChange}
                    id="blood-ab"
                    type="radio"
                    name="blood"
                    label="AB"
                    value="AB"
                    isInvalid={!!errors.blood}
                    checked={values.blood === 'AB'}
                  />
                  <Form.Check
                    onChange={handleChange}
                    id="blood-o"
                    type="radio"
                    name="blood"
                    label="O"
                    value="O"
                    isInvalid={!!errors.blood}
                    checked={values.blood === 'O'}
                  />

                  {!!errors.blood ? <span style={{ color: '#dc3545' }}>{errors.blood}</span> : null}
                </div>
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>Berapakah berat badan anda</Form.Label>
                <Form.Check
                  type="checkbox"
                  name="min_weight"
                  label="Mempunyai Berat Badan Minimal 55 Kg"
                  onChange={handleChange}
                  isInvalid={!!errors.min_weight}
                  feedback={errors.min_weight}
                  id="min_weight_id"
                  checked={values.min_weight}
                />
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>Jenis Kelamin</Form.Label>
                <Form.Control
                  name="sex"
                  onChange={handleChange}
                  as="select"
                  aria-label="Jenis Kelamin">
                  <option value="">Pilih salah satu</option>
                  <option value="M" selected={values.sex === 'M'}>
                    Laki-Laki
                  </option>
                  <option value="L" selected={values.sex === 'L'}>
                    Perempuan belum pernah Hamil dan di transfusi darah
                  </option>
                </Form.Control>
                <Form.Control.Feedback type="invalid">{errors.sex}</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-4">
                <Form.Label>
                  Pernah menderita COVID-19 dan dibuktikan dengan Swab PCR/ Antigen dengan hasil
                  Positif ?
                </Form.Label>
                <Form.Check
                  required
                  type="checkbox"
                  name="positive_covid"
                  label="Ya, pernah"
                  onChange={handleChange}
                  isInvalid={!!errors.positive_covid}
                  feedback={errors.positive_covid}
                  id="positive_covid_id"
                  checked={values.positive_covid}
                />
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>
                  Sudah dinyatakan sembuh dari COVID-19 (dibuktikan dengan hasil Swab Negatif/ surat
                  pernyataan sembuh dari dokter/ RS) dan tidak mengalami gejala selama 14 hari ?
                </Form.Label>
                <div>
                  <Form.Check
                    onChange={handleChange}
                    id="recovered_covid-yes"
                    type="radio"
                    name="recovered_covid"
                    label="Ya"
                    value="YES"
                    checked={values.recovered_covid === 'YES'}
                  />
                  <Form.Check
                    onChange={handleChange}
                    id="recovered_covid-no"
                    type="radio"
                    name="recovered_covid"
                    label="Tidak"
                    value="NO"
                    checked={values.recovered_covid === 'NO'}
                  />
                </div>
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>
                  Kondisi sehat, cukup istirahat, siap menjadi pendonor plasma konvalesen ?
                </Form.Label>
                <div>
                  <Form.Check
                    onChange={handleChange}
                    id="is_healthy-yes"
                    type="radio"
                    name="is_healthy"
                    label="Ya"
                    value="YES"
                    checked={values.is_healthy === 'YES'}
                  />
                  <Form.Check
                    onChange={handleChange}
                    id="is_healthy-no"
                    type="radio"
                    name="is_healthy"
                    label="Tidak"
                    value="NO"
                    checked={values.is_healthy === 'NO'}
                  />
                </div>
              </Form.Group>
              <Form.Group md="4" className="mb-4">
                <Form.Label>
                  Siap mendonorkan plasma darah secara sukarela ke PMI Kota Yogyakarta ?
                </Form.Label>
                <div>
                  <Form.Check
                    onChange={handleChange}
                    id="is_ready_donor-yes"
                    type="radio"
                    name="is_ready_donor"
                    label="Ya"
                    value="YES"
                    isInvalid={!!errors.is_ready_donor}
                    checked={values.is_ready_donor === 'YES'}
                  />
                  <Form.Check
                    onChange={handleChange}
                    id="is_ready_donor-no"
                    type="radio"
                    name="is_ready_donor"
                    label="Tidak"
                    value="NO"
                    isInvalid={!!errors.is_ready_donor}
                    checked={values.is_ready_donor === 'NO'}
                  />
                  {!!errors.blood ? (
                    <span style={{ color: '#dc3545' }}>{errors.is_ready_donor}</span>
                  ) : null}
                </div>
              </Form.Group>
              <Button type="submit">Submit</Button>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};
export default Home;
