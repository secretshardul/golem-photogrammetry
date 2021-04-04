import sgMail from '@sendgrid/mail'
const { SENDGRID_KEY, SENDGRID_EMAIL, SUCCESS_TEMPLATE, FAIL_TEMPLATE } = process.env

sgMail.setApiKey(SENDGRID_KEY!)

export async function sendSuccessMail(email: string, buildLink: string) {
    return await sgMail.send({
        to: email,
        from: {
            email: SENDGRID_EMAIL!,
            name: 'Golem Photogrammetry'
        },
        templateId: SUCCESS_TEMPLATE!,
        dynamicTemplateData: {
            buildLink
        }
    })
}

export async function sendFailureMail(email: string) {
    return await sgMail.send({
        to: email,
        from: {
            email: SENDGRID_EMAIL!,
            name: 'Golem Photogrammetry'
        },
        templateId: FAIL_TEMPLATE!,
    })
}