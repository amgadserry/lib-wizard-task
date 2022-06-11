import { selectCurrentStep, selectPayload, selectSteps, selectSubmissionStatus, setPayload } from './wizardSlice';
import styles from './Wizard.module.css';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { Stepper } from '../../components/stepper/Stepper';
import { Loading } from '../../components/loading/Loading';
import { Genre } from './steps/genre/Genre';
import { validateGenre } from './domain/validation';

export function Wizard() {
  const currentStep = useAppSelector(selectCurrentStep);
  const payload = useAppSelector(selectPayload);
  const submissionStatus = useAppSelector(selectSubmissionStatus);
  const steps = useAppSelector(selectSteps);
  const dispatch = useAppDispatch();

  const _renderStep = () => {
    if (currentStep === 0) {
      return <Genre onChange={(id) => dispatch(setPayload({ genreId: id }))} error={validateGenre(payload)} value={payload.genreId}></Genre>
    }
  }

  const _renderBasedOnStatus = () => {
    switch (submissionStatus) {
      case 'idle':
        return <>
          <div className={styles.title}>Add book - New book</div>
          <Stepper steps={steps} currentStep={currentStep} />
          <div className={styles.stepBody}>{_renderStep()}</div>
        </>;

      case 'submitted':
        return <div className={styles.submitting}>Success</div>

      case 'submitting':
        return <Loading text='Submitting...'></Loading>;
    }
  }


  return (
    <div className={styles.wrapper}>
      {
        _renderBasedOnStatus()
      }
    </div>
  );
}
