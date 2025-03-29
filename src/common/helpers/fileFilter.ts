import { BadRequestException } from "@nestjs/common";

export const imageFilter = (
    req: Express.Request,
    image: Express.Multer.File,
    callback: (error: any, valid: boolean) => void
) => {

    if (!image) {
        return callback(new BadRequestException('Image file is empty'), false);
    }

    const validExtensions = ['jpg', 'jpeg', 'png'];
    const imageExtension = image.mimetype.split('/')[1].toLowerCase();

    if (!validExtensions.includes(imageExtension)) {
        return callback(new BadRequestException('Image must be of type jpg, jpeg, or png'), false);
    }

    callback(null, true);
};
