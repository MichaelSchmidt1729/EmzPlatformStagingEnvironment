<?php

/**
 * Copyright (c) 8mylez GmbH. All rights reserved.
 * This file is part of software that is released under a proprietary license.
 * You must not copy, modify, distribute, make publicly available, or execute
 * its contents or parts thereof without express permission by the copyright
 * holder, unless otherwise permitted by law.
 * 
 *    ( __ )____ ___  __  __/ /__  ____
 *   / __  / __ `__ \/ / / / / _ \/_  /
 *  / /_/ / / / / / / /_/ / /  __/ / /_
 *  \____/_/ /_/ /_/\__, /_/\___/ /___/
 *                 /____/              
 * 
 * Quote: 
 * "Any fool can write code that a computer can understand. 
 * Good programmers write code that humans can understand." 
 * – Martin Fowler
 */

declare(strict_types=1);

namespace Emz\StagingEnvironment\Core\Content\StagingEnvironment;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class StagingEnvironmentEntity extends Entity
{
    use EntityIdTrait;

    /**
     * @var string
     */
    protected $environmentName;

    /**
     * @var string
     */
    protected $folderName;

    /**
     * @var string
     */
    protected $subFolder;

    /**
     * @var string|null
     */
    protected $excludedFolders;

    /**
     * @var string|null
     */
    protected $comment;

    /**
     * @var string
     */
    protected $databaseName;

    /**
     * @var string
     */
    protected $databaseUser;

    /**
     * @var string
     */
    protected $databaseHost;

    /**
     * @var string
     */
    protected $databasePassword;

    /**
     * @var string|null
     */
    protected $databasePort;

    /**
     * @var \DateTimeInterface|null
     */
    protected $createdAt;

    /**
     * @var \DateTimeInterface|null
     */
    protected $updatedAt;

    /**
     * @var bool
     */
    protected $setInMaintenance;

    public function getEnvironmentName(): string
    {
        return $this->environmentName;
    }

    public function setEnvironmentName(string $environmentName): void
    {
        $this->environmentName = $environmentName;
    }

    public function getFolderName(): string
    {
        return $this->folderName;
    }

    public function setFolderName(string $folderName): void
    {
        $this->folderName = $folderName;
    }

    public function getSubFolder(): ?string
    {
        return $this->subFolder;
    }

    public function setSubFolder(?string $subFolder): void
    {
        $this->subFolder = $subFolder;
    }

    public function getExcludedFolders(): ?string
    {
        return $this->excludedFolders;
    }

    public function setExcludedFolders(?string $excludedFolders): void
    {
        $this->excludedFolders = $excludedFolders;
    }

    public function getComment(): ?string
    {
        return $this->comment;
    }

    public function setComment(?string $comment): void
    {
        $this->comment = $comment;
    }

    public function getDatabaseName(): string
    {
        return $this->databaseName;
    }

    public function setDatabaseName(string $databaseName): void
    {
        $this->databaseName = $databaseName;
    }

    public function getDatabaseUser(): string
    {
        return $this->databaseUser;
    }

    public function setDatabaseUser(string $databaseUser): void
    {
        $this->databaseUser = $databaseUser;
    }

    public function getDatabaseHost(): string
    {
        return $this->databaseHost;
    }

    public function setDatabaseHost(string $databaseHost): void
    {
        $this->databaseHost = $databaseHost;
    }

    public function getDatabasePassword(): string
    {
        return $this->databasePassword;
    }

    public function setDatabasePassword(string $databasePassword): void
    {
        $this->databasePassword = $databasePassword;
    }

    public function getDatabasePort(): ?string
    {
        return $this->databasePort;
    }

    public function setDatabasePort(?string $databasePort): void
    {
        $this->databasePort = $databasePort;
    }

    public function getSetInMaintenance(): bool
    {
        return $this->setInMaintenance;
    }

    public function setSetInMaintenance(bool $setInMaintenance): void
    {
        $this->setInMaintenance = $setInMaintenance;
    }
}