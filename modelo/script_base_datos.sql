/****** Object:  Table [dbo].[SUDESPACHOS]    Script Date: 11/18/2022 9:13:55 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SUDESPACHOS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[FechaE] [datetime] NULL,
	[FechaR] [datetime] NULL,
	[id_ruta] [varchar](50) NOT NULL,
	[cedula_chofer] [varchar](50) NULL,
	[placa_transporte] [varchar](50) NULL,
	[nombre_chofer] [varchar](50) NULL,
	[descripcion_transporte] [varchar](100) NULL,
	[id_chofer] [int] NOT NULL,
	[id_transporte] [int] NOT NULL,
	[autorizado_por] [varchar](50) NULL,
	[responsable] [varchar](50) NULL,
	[telefono_chofer] [varchar](100) NULL,
	[estatus] [int] NOT NULL,
	[notas] [varchar](500) NULL,
	[id_usuario] [int] NOT NULL,
 CONSTRAINT [PK_SUCHDESPACHOS2] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SUDESPACHOS] ADD  CONSTRAINT [DF_SUDESPACHOS_id_chofer2]  DEFAULT ((0)) FOR [id_chofer]
GO

ALTER TABLE [dbo].[SUDESPACHOS] ADD  CONSTRAINT [DF_SUDESPACHOS_id_transporte2]  DEFAULT ((0)) FOR [id_transporte]
GO

ALTER TABLE [dbo].[SUDESPACHOS] ADD  CONSTRAINT [DF_SUDESPACHOS_id_usuario_3]  DEFAULT ((0)) FOR [id_usuario]
GO

/****** Object:  Table [dbo].[SUDESPACHOS_01]    Script Date: 11/18/2022 9:14:40 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SUDESPACHOS_01](
	[id_despacho] [int] NOT NULL,
	[tipoFac] [varchar](5) NOT NULL,
	[numeroD] [varchar](50) NOT NULL,
	[nro_unico] [int] IDENTITY(1,1) NOT NULL,
	[codclie] [varchar](50) NULL,
	[descripclie] [varchar](100) NULL,
	[monto_documento] [decimal](8, 4) NOT NULL,
	[cantidad_empaques] [decimal](8, 4) NOT NULL,
	[peso] [decimal](8, 4) NULL,
 CONSTRAINT [PK_SUDESPACHOS_09911] PRIMARY KEY CLUSTERED 
(
	[id_despacho] ASC,
	[tipoFac] ASC,
	[numeroD] ASC,
	[nro_unico] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SUDESPACHOS_01] ADD  CONSTRAINT [DF_SUDESPACHOS_01_monto_documento_2]  DEFAULT ((0)) FOR [monto_documento]
GO

ALTER TABLE [dbo].[SUDESPACHOS_01] ADD  CONSTRAINT [DF_SUDESPACHOS_01_cantidad_empaques_2]  DEFAULT ((0)) FOR [cantidad_empaques]
GO

ALTER TABLE [dbo].[SUDESPACHOS_01] ADD  CONSTRAINT [DF_SUDESPACHOS_01_peso_1]  DEFAULT ((0)) FOR [peso]
GO

ALTER TABLE [dbo].[SUDESPACHOS_01]  WITH CHECK ADD FOREIGN KEY([id_despacho])
REFERENCES [dbo].[SUDESPACHOS] ([id])
GO

/****** Object:  Table [dbo].[SUTRANSPORTE]    Script Date: 11/18/2022 9:16:53 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SUTRANSPORTE](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[codigo] [varchar](20) NULL,
	[descripcion] [varchar](100) NULL,
	[placa] [varchar](50) NULL,
	[id_chofer] [int] NULL,
	[tipo] [int] NULL,
	[propietario] [varchar](100) NULL,
	[telefonos_propietario] [varchar](100) NULL,
	[capacidad_carga] [decimal](10, 4) NULL,
	[unidad_capacidad] [varchar](50) NULL,
	[gps] [int] NULL,
	[notas] [varchar](1000) NULL,
 CONSTRAINT [PK_SUTRANSPORTE] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SUTRANSPORTE] ADD  CONSTRAINT [DF_SUTRANSPORTE_id_chofer]  DEFAULT ((0)) FOR [id_chofer]
GO

ALTER TABLE [dbo].[SUTRANSPORTE] ADD  CONSTRAINT [DF_SUTRANSPORTE_tipo]  DEFAULT ((0)) FOR [tipo]
GO

/****** Object:  Table [dbo].[SUUSERS]    Script Date: 11/18/2022 9:17:24 AM ******/
SET ANSI_NULLS ON
GO

SET QUOTED_IDENTIFIER ON
GO

CREATE TABLE [dbo].[SUUSERS](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[firstName] [varchar](50) NULL,
	[lastName] [varchar](50) NULL,
	[username] [varchar](15) NULL,
	[hash] [varchar](500) NULL,
	[dateCreated] [datetime] NULL,
	[dateUpdated] [datetime] NULL,
	[rol] [int] NULL,
 CONSTRAINT [PK_SUUSERS] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO

ALTER TABLE [dbo].[SUUSERS] ADD  CONSTRAINT [DF_SUUSERS_dateCreated]  DEFAULT (getutcdate()) FOR [dateCreated]
GO

ALTER TABLE [dbo].[SUUSERS] ADD  CONSTRAINT [DF_SUUSERS_dateUpdated]  DEFAULT (getutcdate()) FOR [dateUpdated]
GO

ALTER TABLE [dbo].[SUUSERS] ADD  CONSTRAINT [DF_SUUSERS_rol]  DEFAULT ((0)) FOR [rol]
GO


