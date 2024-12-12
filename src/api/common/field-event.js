export function onFieldInfo({ names, field, form }) {
    const values = split6Value(field.value);
    for (const idx in values) {
        const target = form.query(names[idx]).take();
        if (target) {
            target.value = values[idx];
        }
    }
    return values;
}
export function split6Value(value) {
    if (!value || value.indexOf('^') < 0) return []
    return value.split('^');
}