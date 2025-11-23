import React, { Fragment, useEffect, useState } from 'react'
import Loader from '../Loader'
import Alert from '../Alert'
import { useNavigate } from 'react-router-dom'

const TrackingPanel = ({ ab }) => {
  
  const [ formValues, setFormValues ] = useState({ trackingNo: '' })
  const [ formErrors, setFormErrors ] = useState({})
  const [ isSubmit, setIsSubmit ] = useState(false)
  const [ isLoading, setIsLoading ] = useState(false)
  const [ resp, setResp ] = useState({})
  const navigate = useNavigate()

  useEffect(() => {
    
  }, [])

  const inputHandler = (e) => {
    const { name, value } = e.target
    setFormValues({ ...formValues, [name]: value })
  }

  const validate = (values) => {
    const errors = {}

    if (!values.trackingNo) {
      errors.trackingNo = "Tracking No cannot be blank"
    } else if (values.trackingNo.length < 10) {
      errors.trackingNo = "Enter a valid tracking no"
    } else if (!Number(values.trackingNo)) {
      errors.trackingNo = "Enter a valid tracking no"
    }

    return errors
  }

  const submissionHandler = (e) => {
    e.preventDefault()
    setIsSubmit(true)
    setFormErrors(validate(formValues))
  }

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate(`/tracking/${ formValues.trackingNo }`)
    }
  }, [formErrors])

  return (
    <Fragment>
      { isLoading && <Loader message="Tracking your shipment..." /> }
      <Alert resp={ resp } />
      <div className="shipTrack col">
          <h3 className="heading">Track Your Shipment</h3>
          <form method="POST" className="row g-2 w-100">
              <div className="form-field col w-100 ai-start">
                  <label htmlFor="trackingNo" className="subtext">Enter your tracking no:</label>
                  <input type="text" id="trackingNo" name="trackingNo" value={ formValues.trackingNo } onChange={ inputHandler } className='w-100' />
                  { formErrors.trackingNo && <span className='form-field-error'>{ formErrors.trackingNo }</span> }
              </div>
              <button className="btn1" onClick={ submissionHandler }>Track Now</button>
          </form>
      </div>
    </Fragment>
  )
}

export default TrackingPanel
