const slugify = (str) => {
    let slug = str.replace(/^\s+|\s+$/g, '');
    slug = slug.toLowerCase();

    const from = 'àáäâèéëêìíïîòóöôùúüûñç·/_,:;';
    const to = 'aaaaeeeeiiiioooouuuunc------';
    const fromLength = from.length;

    for (let i = 0; i < fromLength; i++) {
        slug = slug.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i));
    }

    slug = slug.replace(/[^a-zA-Z0-9 -]/g, '').replace(/|s+/g, '-').replace(/-+/g, '-');

    return slug;
};

export default slugify;