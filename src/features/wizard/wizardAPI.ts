import { BookPayload, SubmissionResult } from "./wizardSlice";

export function submit(payload: BookPayload): Promise<SubmissionResult> {
  return new Promise<SubmissionResult>((resolve) =>
    setTimeout(() => resolve({ data: { id: 20, ...payload } }), 2000)
  );
}
