export interface FormRef {
    getData: () => any | null;
    validate: () => boolean;
    reset: () => void;
}