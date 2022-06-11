import {
  selectCurrentStep,
  selectErrors,
  selectPayload,
  selectSteps,
  selectSubmissionStatus,
  setPayload,
  tryNextStep,
} from "./wizardSlice";
import styles from "./Wizard.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Stepper } from "../../components/stepper/Stepper";
import { Loading } from "../../components/loading/Loading";
import { Genre } from "./steps/genre/Genre";
import { Button } from "../../components/button/Button";

export function Wizard() {
  const errors = useAppSelector(selectErrors);
  const currentStep = useAppSelector(selectCurrentStep);
  const payload = useAppSelector(selectPayload);
  const submissionStatus = useAppSelector(selectSubmissionStatus);
  const steps = useAppSelector(selectSteps);
  const dispatch = useAppDispatch();

  const _renderStep = () => {
    if (currentStep === 0) {
      return (
        <Genre
          onChange={(id) => dispatch(setPayload({ genreId: id }))}
          error={errors as string | null}
          value={payload.genreId}
        ></Genre>
      );
    }
  };

  const _renderActions = () => {
    return (
      <div className={styles.actions}>
        {currentStep > 0 && <Button onClick={() => {}}>Back</Button>}
        {currentStep < steps.length - 1 && (
          <Button onClick={() => dispatch(tryNextStep())}>Next</Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button onClick={() => {}}>Submit</Button>
        )}
      </div>
    );
  };

  const _renderBasedOnStatus = () => {
    switch (submissionStatus) {
      case "idle":
        return (
          <>
            <div className={styles.title}>Add book - New book</div>
            <Stepper steps={steps} currentStep={currentStep} />
            <div className={styles.stepBody}>{_renderStep()}</div>
            {_renderActions()}
          </>
        );

      case "submitted":
        return <div className={styles.submitting}>Success</div>;

      case "submitting":
        return <Loading text="Submitting..."></Loading>;
    }
  };

  return <div className={styles.wrapper}>{_renderBasedOnStatus()}</div>;
}
