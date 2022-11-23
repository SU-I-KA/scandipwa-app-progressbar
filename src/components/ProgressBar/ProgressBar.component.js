import React, { Component } from 'react'
import './ProgressBar.style'

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
        <div key={index} block='ProgressBar' elem='Step'>
          <div
            block='ProgressBar'
            elem='Bar'
            mods={{ isSelected: step.selected }}
          ></div>
          <div
            block='ProgressBar'
            elem='Bullet'
            mods={{ isSelected: step.selected }}
          >
            <div
              block='ProgressBar'
              elem='Rounded'
              mods={{ isSelected: step.selected }}
            >
              {step.completed ? (
                <span>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    xmlnsXlink='http://www.w3.org/1999/xlink'
                    version='1.1'
                    id='Capa_1'
                    x='0px'
                    y='0px'
                    width='78.369px'
                    height='78.369px'
                    viewBox='0 0 78.369 78.369'
                    xmlSpace='preserve'
                  >
                    <g>
                      <path
                        fill='#ffffff'
                        d='M78.049,19.015L29.458,67.606c-0.428,0.428-1.121,0.428-1.548,0L0.32,40.015c-0.427-0.426-0.427-1.119,0-1.547l6.704-6.704   c0.428-0.427,1.121-0.427,1.548,0l20.113,20.112l41.113-41.113c0.429-0.427,1.12-0.427,1.548,0l6.703,6.704   C78.477,17.894,78.477,18.586,78.049,19.015z'
                      />
                    </g>
                  </svg>
                </span>
              ) : (
                index + 1
              )}
            </div>
            <p
              block='ProgressBar'
              elem='TextDown'
              mods={{ isSelected: step.selected }}
            >
              {step.description}
            </p>
          </div>
        </div>
      )
    })
    return (
      <div block='ProgressBar' aria-label='Progress Bar'>
        {stepsDisplay}
      </div>
    )
  }
}

export default ProgressBar
