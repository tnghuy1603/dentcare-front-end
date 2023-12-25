import React from 'react'
import { useLocation } from 'react-router-dom'

const TreatmentPlanDetails = () => {
  const location = useLocation();
  const {treatmentPlan} = location.state
  return (
    <>
      <div>This is treatment plan details</div>
      
    </>
  )
}

export default TreatmentPlanDetails