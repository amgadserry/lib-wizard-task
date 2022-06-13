import { BookPayload, SubmissionResult } from "./wizardSlice";

export function submit(payload: BookPayload): Promise<SubmissionResult> {
  console.log("requested submit", payload);
  return new Promise<SubmissionResult>((resolve) =>
    setTimeout(() => resolve({ data: { id: 20, ...payload } }), 2000)
  );
}
