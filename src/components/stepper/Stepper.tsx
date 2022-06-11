import styles from './Stepper.module.css'

export type StepperProps = {
  currentStep: number;
  steps: (string | null)[];
}

export function Stepper(props: StepperProps) {
  const steps = props.steps.map((title, idx) => 
  <Step 
    value={idx + 1}
    text={title}
    isSelected={idx === props.currentStep}
    isFirst={idx === 0}
    isLast={ idx + 1 === props.steps.length }
    key={title}></Step>);

  return <div className={styles.stepper}>
    {
      steps
    }
  </div>;
}


export type StepProps = {
  value: number;
  text: string | null;
  isSelected: boolean;
  isFirst: boolean;
  isLast: boolean;
}

export function Step(props: StepProps) {
  return <div className={styles.step}>
    <div className={styles.indicatorWrapper}>
      <div className={`${styles.lineIndicator} ${ props.isFirst ? styles.invisible : '' }`}></div>
      <div className={` ${styles.indicator} ${props.isSelected ? styles.indicatorSelected : ''}`}>
        {!!props.text ? props.value.toString() : '...'}
      </div>
      <div className={`${styles.lineIndicator} ${ props.isLast ? styles.invisible : '' }`}></div>
    </div>
    {!!props.text && <span className={styles.stepTitle}>{props.text}</span>}
  </div>;
}

Step.defaultProps = {
  isSelected: false,
  isFirst: false,
  isLast: false
} as Partial<StepProps>
