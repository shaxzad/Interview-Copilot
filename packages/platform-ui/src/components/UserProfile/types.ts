import type { UpdateProfileInput } from '@companyio/auth-contracts';

export type ProfileCardProps = {
  profile: UpdateProfileInput;
  onChange: <K extends keyof UpdateProfileInput>(field: K, value: UpdateProfileInput[K]) => void;
  onSave: () => Promise<void>;
  isSaving?: boolean;
};
