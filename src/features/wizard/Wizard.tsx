import {
  BookPayloadInformation,
  reset,
  selectCurrentStep,
  selectErrors,
  selectIsNewSubGenre,
  selectPayload,
  selectSteps,
  selectSubmissionStatus,
  setPayload,
  SubgenrePayload,
  submitBookAsync,
  tryBack,
  tryNextStep,
} from "./wizardSlice";
import styles from "./Wizard.module.css";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { Stepper } from "../../components/stepper/Stepper";
import { Loading } from "../../components/loading/Loading";
import { Genre } from "./steps/genre/Genre";
import { Button } from "../../components/button/Button";
import { Subgenre } from "./steps/subgenres/Subgenre";
import { NewSubgenre } from "./steps/newSubgenre/NewSubgenre";
import { Error } from "./domain/validation";
import { BookInformation } from "./steps/bookInformation/BookInformation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

export function Wizard() {
  const errors = useAppSelector(selectErrors);
  const currentStep = useAppSelector(selectCurrentStep);
  const payload = useAppSelector(selectPayload);
  const submissionStatus = useAppSelector(selectSubmissionStatus);
  const isNewSubgenre = useAppSelector(selectIsNewSubGenre);
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
    } else if (currentStep === 1) {
      return (
        <Subgenre
          onChange={(subgenre) =>
            dispatch(
              setPayload({
                selectedSubgenreResponse: subgenre,
                subGenrePayload: undefined,
              })
            )
          }
          onAddNewSelected={() =>
            dispatch(
              setPayload({
                selectedSubgenreResponse: undefined,
                subGenrePayload: { name: "", isDescriptionRequired: false },
              })
            )
          }
          error={errors as string | null}
          value={payload.selectedSubgenreResponse}
          isNewSelected={!!payload.subGenrePayload}
        ></Subgenre>
      );
    } else if (currentStep === 2 && isNewSubgenre) {
      return (
        <NewSubgenre
          errors={errors as Error<Partial<SubgenrePayload>> | null}
        />
      );
    } else {
      return (
        <BookInformation
          errors={errors as Error<Partial<BookPayloadInformation>> | null}
        />
      );
    }
  };

  const _renderActions = () => {
    return (
      <div className={styles.actions}>
        <Button
          disabled={currentStep === 0}
          onClick={() => dispatch(tryBack())}
        >
          Back
        </Button>
        {currentStep < steps.length - 1 && (
          <Button onClick={() => dispatch(tryNextStep())}>Next</Button>
        )}
        {currentStep === steps.length - 1 && (
          <Button
            onClick={() => {
              dispatch(tryNextStep());
              dispatch(submitBookAsync());
            }}
          >
            Add
          </Button>
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
        return (
          <div className={styles.submitting}>
            <FontAwesomeIcon icon={faCheckCircle} size="10x" color="green" />
            <p>Book added successfully</p>
            <Button onClick={() => dispatch(reset())} type="action">
              Add another book
            </Button>
          </div>
        );

      case "submitting":
        return <Loading text="Submitting..."></Loading>;
    }
  };

  return <div className={styles.wrapper}>{_renderBasedOnStatus()}</div>;
}
