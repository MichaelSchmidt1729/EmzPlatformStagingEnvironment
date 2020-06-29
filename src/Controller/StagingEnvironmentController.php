<?php declare(strict_types=1);

namespace Emz\StagingEnvironment\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\JsonResponse;
use Shopware\Core\Framework\Routing\Annotation\RouteScope;
use Emz\StagingEnvironment\Services\Sync\SyncServiceInterface;
use Emz\StagingEnvironment\Services\Database\DatabaseSyncServiceInterface;
use Emz\StagingEnvironment\Services\Config\ConfigUpdaterServiceInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

/**
 * @RouteScope(scopes={"api"}) 
 */
class StagingEnvironmentController extends AbstractController
{
    /**
     * @var SyncServiceInterface
     */
    private $syncService;

    /**
     * @var DatabaseSyncServiceInterface
     */
    private $databaseSyncService;

    /**
     * @var ConfigUpdaterServiceInterface
     */
    private $configUpdaterService;

    public function __construct(
        SyncServiceInterface $syncService,
        DatabaseSyncServiceInterface $databaseSyncService,
        ConfigUpdaterServiceInterface $configUpdaterService
    )
    {
        $this->syncService = $syncService;
        $this->databaseSyncService = $databaseSyncService;
        $this->configUpdaterService = $configUpdaterService;
    }

    /**
     * @Route("/api/v{version}/_action/emz_pse/environment/sync_files", name="api.action.emz_pse.environment.sync_files", methods={"POST"})
     */
    public function syncFiles(Request $request): JsonResponse
    {
        $selectedProfileId = $request->get('selectedProfileId');

        if ($this->syncService->syncCore($selectedProfileId)) {
            return new JsonResponse([
                "status" => true,
                "message" => "Synced all files!"
            ]);
        }
    }

    /**
     * @Route("/api/v{version}/_action/emz_pse/environment/clone_database", name="api.action.emz_pse.environment.clone_database", methods={"POST"})
     */
    public function cloneDatabase(Request $request): JsonResponse
    {
        $selectedProfileId = $request->get('selectedProfileId');
        
        if ($this->databaseSyncService->syncDatabase($selectedProfileId)) {
            return new JsonResponse([
                "status" => true,
                "message" => "Database cloned!"
            ]);
        }
    }

    /**
     * @Route("/api/v{version}/_action/emz_pse/environment/update_settings", name="api.action.emz_pse.environment.update_settings", methods={"POST"})
     */
    public function updateSettings(Request $request): JsonResponse
    {
        $selectedProfileId = $request->get('selectedProfileId');

        $done = true;
        $done = $this->configUpdaterService->setSalesChannelDomains($selectedProfileId);
        $done = $this->configUpdaterService->setSalesChannelsInMaintenance($selectedProfileId);
        $done = $this->configUpdaterService->createEnvFile($selectedProfileId);

        if ($done) {
            return new JsonResponse([
                "status" => true,
                "message" => "Updated settings!"
            ]);
        }
    }
}