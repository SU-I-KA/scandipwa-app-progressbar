import { Checkout as SourceCheckout } from 'SourceRoute/Checkout/Checkout.component'

import ProgressBar from 'Src/components/ProgressBar/ProgressBar.component'
import ContentWrapper from 'SourceComponent/ContentWrapper'

import {
  BILLING_STEP,
  DETAILS_STEP,
  SHIPPING_STEP,
} from 'SourceRoute/Checkout/Checkout.config'

/** @namespace ScandipwaApp/Route/Checkout/Component */
export class CheckoutComponent extends SourceCheckout {
  renderProgressBar = () => {
    const steps = [
      {
        id: SHIPPING_STEP,
        desc: 'shipping',
      },
      {
        id: BILLING_STEP,
        desc: 'review & payments',
      },
      {
        id: DETAILS_STEP,
        desc: 'success',
      },
    ]
    const { checkoutStep } = this.props
    return <ProgressBar steps={steps} currentStep={checkoutStep} />
  }

  render() {
    return (
      <main block='Checkout'>
        {this.renderProgressBar()}
        <ContentWrapper
          wrapperMix={{ block: 'Checkout', elem: 'Wrapper' }}
          label={__('Checkout page')}
        >
          {this.renderSummary(true)}
          <div block='Checkout' elem='Step'>
            {this.renderTitle()}
            {this.renderGuestForm()}
            {this.renderStep()}
            {this.renderLoader()}
          </div>
          <div>
            {this.renderSummary()}
            {this.renderPromo()}
            {this.renderCoupon()}
          </div>
        </ContentWrapper>
      </main>
    )
  }
}

export default CheckoutComponent
