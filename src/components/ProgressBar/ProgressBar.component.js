import React, { Component } from 'react'
import './styleFile.css'

export class ProgressBar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      newStep: [],
    }
    this.stepsRef = React.createRef()
  }

  updateStep = (currStep, steps) => {
    const newSteps = [...steps]

    const currStepIndex = steps?.findIndex((x) => {
      return x.id === currStep
    })

    for (let i = 0; i < steps.length; i++) {
      if (i === currStepIndex) {
        newSteps[i] = {
          ...newSteps[i],
          selected: true,
          completed: false,
        }
      }
      //step completed
      else if (currStepIndex > i) {
        newSteps[i] = {
          ...newSteps[i],
          selected: true,
          completed: true,
        }
      }
      //step pending
      else {
        newSteps[i] = {
          ...newSteps[i],
          selected: false,
          completed: false,
        }
      }
    }

    return newSteps
  }

  componentDidMount() {
    const stepsState = this.props.steps.map((step, index) =>
      Object.assign(
        {},
        {
          id: step.id,
          description: step.desc,
          completed: false,
          selected: index === 0 ? true : false,
        }
      )
    )

    this.stepsRef.current = stepsState
    this.setState({
      newStep: stepsState,
    })
  }

  componentDidUpdate(prevProps) {
    if (prevProps.currentStep !== this.props.currentStep) {
      const current = this.updateStep(
        this.props.currentStep,
        this.stepsRef.current
      )
      this.setState({
        newStep: current,
      })
    }
  }

  render() {
    const stepsDisplay = this?.state?.newStep?.map((step, index) => {
      return (
        <div key={index} className='step'>
          <div className={`bar ${step.selected && 'selected'}`}></div>
          <div className={`bullet ${step.selected && 'selected '}`}>
            <div className={`rounded ${step.selected && 'selected '}`}>
              {step.completed ? (
                <span className='tspan'>&#10003;</span>
              ) : (
                index + 1
              )}
            </div>
            <p className={`text-down ${step.selected && 'selected'}`}>
              {step.description}
            </p>
          </div>
        </div>
      )
    })
    return <div className='progressBar'>{stepsDisplay}</div>
  }
}

export default ProgressBar
