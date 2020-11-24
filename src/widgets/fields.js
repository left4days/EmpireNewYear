import { FieldWrapperHOC } from "widgets/FieldHOC";
import { Input } from "ui/Input";
import { Textarea } from "ui/Textarea";

const WrappedInput = FieldWrapperHOC(Input);
const WrappedTextArea = FieldWrapperHOC(Textarea);

export { WrappedInput as Input, WrappedTextArea as Textarea };
