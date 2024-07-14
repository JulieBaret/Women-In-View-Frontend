
import DOMPurify from "dompurify";

export const sanitizeInput = (str) => {
    return DOMPurify.sanitize(str);
}