<?php

namespace App\Controller\User;

use App\Entity\Equipment;
use App\Entity\Material;
use App\Entity\Profession;
use App\Entity\Profile;
use App\Entity\User;
use App\Entity\UserEquipment;
use App\Entity\UserProfession;
use App\Service\CloudinaryService;
use Doctrine\ORM\EntityManagerInterface;
use Lexik\Bundle\JWTAuthenticationBundle\Services\JWTTokenManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class CreateUserController extends AbstractController
{
    #[Route('/api/create/user', name: 'api_user_create', methods: ['POST'])]
    public function __invoke(
        Request $request,
        SerializerInterface $serializer,
        ValidatorInterface $validator,
        UserPasswordHasherInterface $passwordHasher,
        EntityManagerInterface $entityManager,
        CloudinaryService $cloudinaryService,
        JWTTokenManagerInterface $JWTTokenManager
    ): Response {

        $data = json_decode($request->getContent(), true);
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');

        $errors = $validator->validate($user);
        if (count($errors) > 0) {
            return $this->json($errors, Response::HTTP_BAD_REQUEST);
        }
        if (isset($data['profileInfos']) && is_array($data['profileInfos'])) {
            $profileData = $data['profileInfos'];
            $profile = new Profile();
            $profile->setBio($profileData['bio'] ?? '');
            $profile->setTwitter($profileData['twitter'] ?? '');
            $profile->setInstagram($profileData['instagram'] ?? '');
            $profile->setYoutube($profileData['youtube'] ?? '');
            $profile->setFacebook($profileData['facebook'] ?? '');
            $profile->setDeezer($profileData['deezer'] ?? '');
            $profile->setSpotify($profileData['spotify'] ?? '');
            $profile->setTidal($profileData['tidal'] ?? '');
            $profile->setCustomSite($profileData['otherPlatforms'] ?? '');

            $user->setProfile($profile);

            $profileErrors = $validator->validate($profile);
            if (count($profileErrors) > 0) {
                return $this->json($profileErrors, Response::HTTP_BAD_REQUEST);
            }

            $entityManager->persist($profile);
        }

        if (isset($data['equipments']) && is_array($data['equipments'])) {
            foreach ($data['equipments'] as $equipmentData) {
                $equipment = $entityManager->getRepository(Equipment::class)->find($equipmentData['id']);
                if ($equipment) {
                    $userEquipment = new UserEquipment();
                    $userEquipment
                        ->setUser($user)
                        ->setEquipment($equipment);
                        $entityManager->persist($userEquipment);
                }
            }
        }

        if (isset($data['professions']) && is_array($data['professions'])) {
            foreach ($data['professions'] as $professionData) {
                $profession = $entityManager->getRepository(Profession::class)->find($professionData['id']);
                if ($profession) {
                    $userProfession = new UserProfession();
                    $userProfession
                        ->setUser($user)
                        ->setProfession($profession);
                        $entityManager->persist($userProfession);
                }
            }
        }


        // Upload avatar
        // if (isset($data['profile']['avatar']) && !empty($data['profile']['avatar'])) {
        //     $filePath = $data['profile']['avatar']['tmp_name'];
        //     $uploadResult = $cloudinaryService->upload($filePath, [
        //         'folder' => 'user_avatars'
        //     ]);
        //     $avatarUrl = $uploadResult['secure_url'];
        //     $user->getProfile()->setAvatar($avatarUrl);
        // }


        if (isset($data['citySelected']) && is_array($data['citySelected'])) {
            $user->setCity($data['citySelected']['value']);
        }
        if (isset($data['countrySelected']) && is_array($data['countrySelected'])) {
            $user->setCountry($data['countrySelected']['value']);
        }

        // Create a folder
        $bytes = random_bytes(5);
        $folder = bin2hex($bytes);
        $user->setFolder($folder);

        $hashedPassword = $passwordHasher->hashPassword($user, $user->getPassword());
        $user->setPassword($hashedPassword);
        $user->setRoles(["ROLE_USER"]);

        $entityManager->persist($user);
        $entityManager->flush();

        $token = $JWTTokenManager->create($user);

        return $this->json([
            'user' => $user,
            'folder' => $folder,
            'token' => $token
        ], Response::HTTP_CREATED, [], ['groups' => 'user:read']);
    }
}
