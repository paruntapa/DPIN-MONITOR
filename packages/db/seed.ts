import { prismaClient } from "./src";

const USER_ID = "4";

async function seed() {
    await prismaClient.user.create({
        data: {
            id: USER_ID,
            email: "admin@example.com",
        },
    });

    const website = await prismaClient.website.create({
        data: {
            url: "https://example.com",
            userId: USER_ID,
        },
    });

    const validator = await prismaClient.validator.create({
        data: {
            location: "Delhi",
            publicKey: "0x3211234567890",
            ip: "127.0.0.1",
        },
    });

    await prismaClient.websiteTick.create({
        data: {
            websiteId: website.id,
            validatorId: validator.id,
            status: "Good",
            latency: 100,
            createdAt: new Date(),
        },
    });

    await prismaClient.websiteTick.create({
        data: {
            websiteId: website.id,
            validatorId: validator.id,
            status: "Good",
            latency: 100,
            createdAt: new Date(Date.now() - 1000 * 60 * 10),
        },
    });

    await prismaClient.websiteTick.create({
        data: {
            websiteId: website.id,
            validatorId: validator.id,
            status: "Bad",
            latency: 100,
            createdAt: new Date(Date.now() - 1000 * 60 * 20),
        },
    });
}

seed();
